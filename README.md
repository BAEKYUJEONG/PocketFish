# A202 21.03.08 ~ 21.03.12 

<br>

## 21.03.08

#### 프로젝트 방향

- 오픈 api사용 + 서비스 아이디어 중심
  - 기획의도 + 기술적 스택 모두 다 잡아보겠다

<br>

#### 아이디어 브레인스토밍

1. **수어 ➡ 텍스트 변환**
   - 실시간으로 웹캠을 통해 수어를 인식하면 해당되는 텍스트가 나타남
   - 청인(농인) ↔ 비장애인 사이의 의사소통에 사용 가능
   - 비장애인이 수어를 학습할 때 사용 가능
2. **이미지에 있는 텍스트 ➡ 수어 변환**
   - 글자가 있는 사진을 수어로 안내해주는 서비스
   - 청인(농인)에게 더 다양한 컨텐츠를 접할 수 있도록 도와줌
   - 국내 청인의 문맹률은 30% ➡ 문맹인 청인들이 쉽게 컨텐츠를 이해할 수 있게끔 도와줌
3. **낚시 도감/다이어리**
   - 낚시인들을 위한 포켓몬 도감
   - 내가 잡은 물고기를 기록/분석해주는 서비스
   - 다른 낚시꾼들끼리 낚시 기록을 비교할 수 있는 커뮤니티 제공
4. **미션 인증**
   - 무기력 타파 도우미
     - 유사앱: 챌린저스
     - 사용자가 사진을 올리면 캡셔닝을 통해 주어진 미션 성공/실패 여부 판단
   - 여행 기록
     - 특정 여행 장소에서 사진 찍는 미션
     - 이후 이미지 캡션을 통해 나의 여행기록을 정리 가능 (1 앨범 = 1 여행기록)
5. **이미지 기반 번역기**
   - 유저가 올린 이미지를 기반으로 캡션을 통해 번역 제공
   - 사용하기 쉬운 이미지 기반 번역기
6. **운동 도우미**
   - 카메라를 통해 나의 운동 자세 확인 후 자세의 정확도에 대해 안내해주는 서비스





# 0319 발표

- #### 아키텍처

<img src="C:/ssafy/특화 PROJECT 2/s04p22a202/resources/architecture.jpg" alt="1" style="zoom:50%;" />

- #### 시퀀스 다이어그램

  - ##### 인증

  <img src="C:/ssafy/특화 PROJECT 2/s04p22a202/resources/Sequence diagram certification.jpg" alt="1" style="zoom:50%;" />

  - ##### 분석

  <img src="C:/ssafy/특화 PROJECT 2/s04p22a202/resources/Sequence diagram analysis.jpg" alt="1" style="zoom:50%;" />

- #### ERD

  - 자주 update이 되는 부분 세부 정규화

<img src="C:/ssafy/특화 PROJECT 2/s04p22a202/resources/ERD.jpg" alt="1" style="zoom:50%;" />

- #### 와이어프레임

  - 회원가입 

    - 소셜 로그인 확정 : 카카오

    <img src="C:/ssafy/특화 PROJECT 2/s04p22a202/resources/WireFrame - User-Signup.jpg" alt="1" style="zoom:50%;" />

  - 로그인 

    - 소셜 로그인 대체 전 와이어프레임

    <img src="C:/ssafy/특화 PROJECT 2/s04p22a202/resources/WireFrame - User-login.jpg" alt="1" style="zoom:50%;" />

  - 회원 정보

    <img src="C:/ssafy/특화 PROJECT 2/s04p22a202/resources/WireFrame - userinfo.jpg" alt="1" style="zoom:50%;" />

  - 물고기 보관함

    - 사진, 메모, 내용이 간략히 들어감

    <img src="C:/ssafy/특화 PROJECT 2/s04p22a202/resources/WireFrame - Collection_Fish tank.jpg" alt="1" style="zoom:50%;" />

  - 물고기 상세보기

    - User 입장

      <img src="C:/ssafy/특화 PROJECT 2/s04p22a202/resources/WireFrame - Collection-Collection_User.jpg" alt="1" style="zoom:50%;" />

    - Others 입장 

      <img src="C:/ssafy/특화 PROJECT 2/s04p22a202/resources/WireFrame - Collection-Collection_Others.jpg" alt="1" style="zoom:50%;" />

  - 카메라

    - 글을 등록하기 위한 사진 촬영 과정

    <img src="C:/ssafy/특화 PROJECT 2/s04p22a202/resources/WireFrame-Camera.jpg" alt="1" style="zoom:50%;" />

  - 물고기 등록

    - 글 작성 1

      <img src="C:/ssafy/특화 PROJECT 2/s04p22a202/resources/WireFrame-Writing 1.jpg" alt="1" style="zoom:50%;" />

    - 글 작성 2

      <img src="C:/ssafy/특화 PROJECT 2/s04p22a202/resources/WireFrame-Writing 2.jpg" alt="1" style="zoom:50%;" />

    - 글 작성 3

      <img src="C:/ssafy/특화 PROJECT 2/s04p22a202/resources/WireFrame-Writing 3.jpg" alt="1" style="zoom:50%;" />

    - 글 작성 4

      <img src="C:/ssafy/특화 PROJECT 2/s04p22a202/resources/WireFrame-Writing 4.jpg" alt="1" style="zoom:50%;" />

  - 랭킹

    - Top 1-3, Top 4-50 가 보여짐

    <img src="C:/ssafy/특화 PROJECT 2/s04p22a202/resources/WireFrame - Ranking-Rank.jpg" alt="1" style="zoom:50%;" />

  