package com.a202.fishserver.service.collection;

import com.a202.fishserver.domain.collection.Collection;
import com.a202.fishserver.domain.collection.CollectionRepository;
import com.a202.fishserver.domain.fish.Fish;
import com.a202.fishserver.domain.fish.FishRepository;
import com.a202.fishserver.domain.fishImage.FishImage;
import com.a202.fishserver.domain.fishImage.FishImageRepository;
import com.a202.fishserver.domain.user.User;
import com.a202.fishserver.domain.user.UserRepository;
import com.a202.fishserver.dto.collection.CollectionPostRequestDto;
import lombok.RequiredArgsConstructor;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CollectionServiceImpl implements CollectionService{
    private final CollectionRepository collectionRepository;
    private final FishImageRepository fishImageRepository;
    private final FishRepository fishRepository;
    private final UserRepository userRepository;

    /**
     * 내 보관함 조회
     */
    public List<HashMap<String, Object>> getMyCollections(long userId){
        List<Collection> list = collectionRepository.findByUser(new User(userId));
        List<HashMap<String, Object>> result = new ArrayList<>();

        for (Collection c : list) {
            // 삭제여부 true인 것은 list에 담지 않음
            if (c.getFlag()) continue;

            List<FishImage> fishImage = fishImageRepository.findByCollection(c);
            String imagePath = ""; // small image (long url)
            for (FishImage tmp : fishImage) {
                if (tmp.getImagePath().length() > imagePath.length()) imagePath = tmp.getImagePath();
            }

            HashMap<String, Object> map = new HashMap<>();
            map.put("collectionId", c.getId());
            map.put("fishImage", imagePath);
            result.add(map);
        }
        return result;
    }

    /**
     * 도감 상세 조회
     */
    public HashMap<String, Object> getCollectionDetail (long collectionId) throws Exception{
        Optional<Collection> collection = collectionRepository.findById(collectionId);
        if (!collection.isPresent()) throw new Exception("도감이 존재하지 않습니다.");

        List<FishImage> fishImage = fishImageRepository.findByCollection(collection.get());
        String imagePath = ""; // origin image (short url)
        if (fishImage.size() == 0) imagePath = "";
        else {
            imagePath = fishImage.get(0).getImagePath();
            for (FishImage tmp : fishImage) {
                if (tmp.getImagePath().length() < imagePath.length()) imagePath = tmp.getImagePath();
            }
        }

        HashMap<String, Object> map = new HashMap<>();
        map.put("collectionId", collectionId);
        map.put("fishName", collection.get().getFish().getName());
        map.put("fishImage", imagePath);
        map.put("fishLength", collection.get().getLength());
        map.put("fishLocation", collection.get().getLocation());
        map.put("fishMemo", collection.get().getMemo());
        map.put("fishBait", collection.get().getBait());
        map.put("fishingInfo", collection.get().getFishingInfo());
        map.put("regDate", collection.get().getRegDate());

        return map;
    }

    /**
     * 물고기 등록
     */
    public void postCollection(CollectionPostRequestDto dto) throws Exception{
        Optional<User> user = userRepository.findById(dto.getUser_id());
        Optional<Fish> fish = fishRepository.findById(dto.getFish_id());
        if (!user.isPresent()) throw new Exception("해당 사용자가 존재하지 않습니다.");
        if (!fish.isPresent()) throw new Exception("해당 물고기가 존재하지 않습니다.");

        String rootPath = "/root/data/images/collection/";
        String apiPath = "https://j4a202.p.ssafy.io/images/collection/";
        String fileName = user.get().getId() + "_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmSSS"));
        String filePath = rootPath + fileName;


        // 저장할 파일 경로를 지정
        File file = new File(filePath);
        // BASE64를 일반 파일로 변환하고 저장
        Base64.Decoder decoder = Base64.getDecoder();
        byte[] decodedBytes = decoder.decode(dto.getFish_image().getBytes());
        FileOutputStream fileOutputStream = new FileOutputStream(file);
        fileOutputStream.write(decodedBytes);
        fileOutputStream.close();
        // File을 MultipartFile로 변환
        FileItem fileItem = new DiskFileItem("mainFile", Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file.getParentFile());
        try {
            InputStream input = new FileInputStream(file);
            OutputStream os = fileItem.getOutputStream();
            IOUtils.copy(input, os);
            // Or faster..
            IOUtils.copy(new FileInputStream(file), fileItem.getOutputStream());
        } catch (IOException ex) {
            // do something.
            System.out.println("이미지 변환 오류: " + ex.getMessage());
        }
        MultipartFile multipartFile = new CommonsMultipartFile(fileItem);
        multipartFile.transferTo(file);

        Collection c;
        try {
            c = collectionRepository.save(Collection.builder()
                    .fish(fish.get())
                    .bait(dto.getBait())
                    .fishingInfo(dto.getFishing_info())
                    .length(dto.getLength())
                    .location(dto.getLocation())
                    .memo(dto.getMemo())
                    .user(user.get())
                    .regDate(LocalDateTime.now())
                    .flag(false)
                    .build());
        } catch (Exception e) {
            throw new Exception("보관함 저장 중 오류 발생");
        }

        if (dto.getFish_image() != null) {
            fishImageRepository.save(FishImage.builder()
                                                .collection(c)
                                                .imagePath(apiPath + fileName)
                                                .build());

            try{
                String imgOriginalPath= rootPath + fileName; // 원본 이미지 파일명
                String imgTargetPath= rootPath + "small_" + fileName; // 새 이미지 파일명
//                String imgFormat = FilenameUtils.getExtension(dto.getFish_image().getOriginalFilename()); // 새 이미지 포맷. jpg, gif 등

                int newWidth = ImageIO.read(multipartFile.getInputStream()).getWidth() / 2; // 변경 할 넓이
                int newHeigt = ImageIO.read(multipartFile.getInputStream()).getWidth() / 2; // 변경 할 높이

                Image image = ImageIO.read(new File(imgOriginalPath)); // 원본 이미지 가져오기
                Image resizeImage = image.getScaledInstance(newWidth, newHeigt, Image.SCALE_DEFAULT);

                // 새 이미지  저장하기
                File newFile = new File(imgTargetPath);
                BufferedImage newImage = new BufferedImage(newWidth, newHeigt, BufferedImage.TYPE_INT_RGB);
                Graphics g = newImage.getGraphics();
                g.drawImage(resizeImage, 0, 0, null);
                g.dispose();
                ImageIO.write(newImage, "jpeg", newFile);

                // FishImage테이블에 small size image 저장
                fishImageRepository.save(FishImage.builder()
                        .collection(c)
                        .imagePath(imgTargetPath)
                        .build());

            }catch (Exception e){
                throw new Exception("이미지 리사이징 오류: " + e.getMessage());
            }
        }
    }

    /**
     * 도감 정보 수정
     */
    public void putCollection(CollectionPostRequestDto dto, long collectionId) throws Exception{
        Optional<Collection> collection = collectionRepository.findById(collectionId);
        Optional<User> user = userRepository.findById(dto.getUser_id());
        Optional<Fish> fish = fishRepository.findById(dto.getFish_id());
        if (!collection.isPresent()) throw new Exception("해당 도감이 존재하지 않습니다.");
        if (!user.isPresent()) throw new Exception("해당 사용자가 존재하지 않습니다.");
        if (!fish.isPresent()) throw new Exception("해당 물고기가 존재하지 않습니다.");

        collectionRepository.save(Collection.builder()
                .id(collectionId)
                .fish(fish.get())
                .bait(dto.getBait())
                .fishingInfo(dto.getFishing_info())
                .length(dto.getLength())
                .location(dto.getLocation())
                .memo(dto.getMemo())
                .user(user.get())
                .regDate(LocalDateTime.now())
                .flag(false)
                .build());
    }

    /**
     * 도감 정보 삭제
     */
    @Override
    public void putCollectionFlag(long collectionID) throws Exception {
        Optional<Collection> collection = collectionRepository.findById(collectionID);
        if (!collection.isPresent()) throw new Exception("해당 도감 정보가 존재하지 않습니다.");

        collection.get().setFlag(true);
        collectionRepository.save(collection.get());
    }

}
