# CNN 이론

- https://github.com/minsuk-heo/deeplearning/blob/master/src/CNN_Tensorflow.ipynb
- https://www.youtube.com/watch?v=RLlI9q6Uojk
- image 인식에 많이 쓰임
- MLP 에서는 하나의 레이어, 한 픽셀만 다르더라도 큰 파장 -> 많은 시간이 걸림
- CNN에서는 5x5를 하나의 array로 만들지 않고 그대로 봄
  - 부분적으로 2x2 필터를 씌움
  - 이동하면서 숫자를 곱해감
- CONV : convolutional 레이어
  - 가장 low 레벨의 특징을 찾음 ex. 숫자 -> 머리, 꼬리, 커넥터 찾음
  - 이후의 conv레이어에서는 low레벨의 특징을 조합하여 high레벨 특징을 찾음 ex. 삼각형, 사각형, 동그라미
- RELU : activation function
- POOL : pooling 레이어
  - 찾아진 모든 특징들을 input으로 집어넣어서 결과적으로 분류함 ex. 자동차, 트럭  /  ex. 숫자 -> 1, 9
  - CONV의 output: feature map
    - feature map에서 max pooling하면 가장 큰 값들만 가져옴
    - max pooling으로 인해 variable 개수가 상당히 줄어듬
    - 컴퓨팅 하는 리소스를 적게 씀 (메모리, 시간)
    - variance가 줄어들면, overfitting의 위험도 줄어들음
  - zero padding
    - 원래의 정보 잃지 않기 위함
    - 주변을 0으로 감쌈
    - input size랑 같은 output을 갖게 됨 -> 정보의 손실이 이전보다 줄어듬
    - CNN에게 여기가 이 이미지의 끝부분이라는 정보도 줄 수 있음



## 이미지가 Color라면?

- input tensor: (10, 28, 28, 1) --> (10, 28, 28, 3) // 3 -> R G B
- 컬러 이미지는 하나 같지만 실제로는 세개의 matrix가 있음 (R, G, B)
  - 하나의 필터에는 subset으로 세 개의 matrix가 존재함
  - weight value가 각각 다름
  - striding 하고 각자 value를 얻으면 다 더해서(세 개의 matrix), bias랑 더함 -> feature map





## Train

![image-20210315021856381](image\image-20210315021856381.png)

- 9:30 https://www.youtube.com/watch?v=RLlI9q6Uojk