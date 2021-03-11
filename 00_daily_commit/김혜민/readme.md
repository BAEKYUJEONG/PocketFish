# 필수 지식 학습

## 이미지 처리

### CNN

#### 기본 연산들 

__CNN__ Convolutional Neural Network

1. 합성곱층 convolutional layer

   1. 완전연결 계층의 문제점 

      - 3차원의 데이터 -> 1차원의 데이터

        => 데이터의 형상이 무시 

      - 이미지 데이터 = 3차원의 형상 : 공간적 구조(spatial structure)를 가진다 => 공간적 구조가 무시

        > cf. 공간적 구조 
        >
        > ex ) 가까운 픽셀은 값이 비슷하거나, RGB의 각 채널은 서로 밀접하게 관련되어 있거나 등 3차원 공간에서의 정보

   2. 합성곱층

      - 완전 연결 계층과 달리 입력 데이터의 형상을 유지 

      - 형상을 가지는 데이터를 제대로 학습할 가능성이 높음

      - __ 합성곱층의 뉴런__

        - 이미지의 모든 픽셀에 연결되는 것이 아닌 수용영역(receptive field) 안에 있는 픽셀에만 연결

          > cf. 
          >
          > i 번째 합성곱층은 저수준 특성에 집중
          >
          > i+1 번째 합성곱층에서는 고수준 특성으로 조합

   3. 필터 filter

      - 필터(filter) = 커널(kernel)
        - 합성곱층에서의 수용영역(receptive field)
        - 합성곱층에서의 가중치 파라미터(W)
      - 합성곱 층에서 입력 데이터에 필터를 적용하여 필터와 유사한 이미지의 영역을 강조하는 __특성맵__을 출력하여 다음 layer으로 전달

   4. 합성곱(convolution) vs 교차 상관(cross-correlation)

      1. 합성곱 : 하나의 함수와 또 다른 함수를 __반전__ 이동한 값을 곱한 다음, 구간에 대해 적분하여 새로운 함수를 구하는 연산자 
         - 푸리에 변환(Fourier transform)과 라플라스 변환(Laplace transform)에 밀접한 관계가 있음
         - 신호 처리 분야에 많이 사용
      2. 교차 상관
         - 함수를 반전하는 것만 빼고는 합성곱과 동일한 함수
         - CNN의 합성곱층에서 사용 
           - 합성곱 연산을 하려면, 필터를 뒤집은(반전) 다음 적용해야됩니다. 
           - 하지만, CNN에서는 필터의 값을 학습하는 것이 목적이기 때문에 합성곱과 교차상관 중 어느 것을 사용하나 동일해서 연산이 적은 것을 사용한다 => __CNN에서 교차 상관을 사용하는 이유__

   5. 합성곱층 연산

      - 윈도우 Window : 데이터와 필터(커널)의 모양을 (높이, 너비)로 나타내는 것
      - 필터 = Conv Layer의 가중치(W)에 해당
      - __연산__
        - 필터의 윈도우를 일정한 간격으로 이동해가며 계산
        - FMA Fused Multiply-Add (입력 데이터와 필터간에 서로 대응하는 원소끼리 곱한 후의 총합) 계산 
        - 편한(bias)는 필터를 적용한 후 더한다
      
   6. 패딩(padding)

      - 패딩 : 합성곱 연산을 수행하기 전, 입력데이터 주변을 특정값으로 채워 늘리는 것
      - 패딩으로 출력데이터의 공간적(spatial) 크기를 조절
      - 패딩을 할 때, 채울 값은 hyper-parameter로 어떤 값을 채울지 결정
        - 주로 zero-padding을 사용
      - 패딩의 사용 이유
        - 패딩을 사용하지 않을 경우, 데이터의 spatial 크기는 conv layer를 지날때마다 작아지게 되므로, 가장자리의 정보들이 사라지는 문제가 발생하기 때문에 패딩을 사용한다
        - 주로 합성곱 계층의 출력이 입력 데이터의 공간적 크기와 동일하게 맞추기 위해 사용

   7. 스트라이드(stride)

      - 스트라이드 : 입력데이터에 필터를 적용할 때 이동할 간격을 조절하는것 = 필터가 이동할 간격
      - 출력 데이터의 크기를 조절하기 위해 사용
      - 1과 같은 작은 값으로 더 잘 작동

   8. 출력 크기 계산

      1. 

2. 풀링층 pooling layer





[참고사이트] 

https://excelsior-cjh.tistory.com/180





# 강의

### 기본적인 ML의 용어와 개념 설명

__explicit programing__ : 일반적인 프로그램. 개발자가 판단 기준을 명시하여 작동하는 것.

__ML__ : 스스로 학습하여 판단 기준을 만드는 것

- 학습
  - 학습 방법으로 분류
    - supervised learning : 레이블 데이터로 학습을 하는 것
      - regression : x값에 따른 y값 예측
      - classification 
        - binary classification :  y값이 그룹(P,NP)일 경우,  y 값 예측
      - multi-label classification : y값이 그룹(A,B,C,D)일 경우, y 값 예측
    - unsupervised learning : 레이블 되지 않은 데이터로 학습하는 것
      - new grouping / word clustering 

- training data



### simple linear regression

__linear regression 선형회귀__ : 데이터를 가장 잘 나타내는 직선의 방정식을 찾는 것

- 직선의 방정식  y=ax+b
- H(x)=Wx+b
  - Hypothesis [H(x)] : 가설 함수, 모델, 예측
  - cost : 실제데이터와 예측값의 차이
    - = loss = error
    - H(x)-y : 음수 & 양수 => 최소가 되는 합을 찾는 것이 무의미해질 수 있다 
    - => H(x)-y의 값을 제곱하여 평균을 구해 그 값을 cost로 사용한다. 



=> __학습의 목적 : minimize cost__

__gradient descent 경사 하강법__ 





__How to minimize cost__



