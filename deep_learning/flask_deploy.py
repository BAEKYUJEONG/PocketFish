from flask import Flask, request
import os
import sys
import numpy as np
from PIL import Image
from keras.models import Sequential
from keras.layers import Dropout, Dense, BatchNormalization
from keras.layers import Flatten, Conv2D, MaxPool2D, Activation
from keras.optimizers import RMSprop
from keras.optimizers.schedules import ExponentialDecay
from keras.regularizers import l2
from keras.callbacks import ModelCheckpoint, EarlyStopping
from keras.models import load_model
import datetime
import matplotlib.pyplot as plt
import tensorflow as tf
import collections

from random import shuffle
from glob import glob
import shutil
from shutil import copyfile
import json
import base64
import io

class_names = ['carpfish', 'rockfish', 'golden mandarin fish', 'red snapper', 'flatfish']
img_height = 112
img_width = 112

# load model
model_path = "./model/test_model2.h5"
pred_model = load_model(model_path)

app = Flask(__name__)

@app.route('/ai/', methods=['POST'])
def predict():
    if request.method == 'POST':
        # string으로 이미지 받아오기
        # ex) (echo -n '{"file": "'; base64 1.JPG; echo '"}') | curl -X POST -H "Content-Type: application/json" -d @-  http://skeldtcan.iptime.org:5000
        file = request.json['file']
        image_bytes = base64.b64decode(file)

        # 분류 결과 확인 및 클라이언트에게 결과 반환
        class_name = Dataization(image_bytes, img_width, img_height)
        
        # 내림차순 정렬
        result = "{"
        for k, v in class_name.items():
            if v == 0:
                break
            result += f"'{k}':{v},"
        result = result[:-1] + "}"
        
        print(class_name)
        print(result)
        return json.dumps(result) 

def Dataization(image_bytes, img_w, img_h):
    # 이미지 저장
    img = Image.open(io.BytesIO(image_bytes))
    img = img.convert("RGB")
    img = img.resize((img_w, img_h))
    img_data = np.asarray(img)
    pred_data = [img_data/255]
    pred_data = np.array(pred_data)

    # predict
    pred_result = pred_model.predict(pred_data)[0]
    pred_result = list(pred_result)
    result_percentage = [round(p*100,3) for p in pred_result]
    
    # save dict
    fish = collections.OrderedDict()
    for k, v in zip(class_names, result_percentage):
        fish[k] = v

    fish = collections.OrderedDict(sorted(fish.items(), key=lambda x: -x[1]))
    
    return fish

 # 최대 50MB
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024 
# 모든 호스트에 대해 접속 허용
app.run(threaded=False, host='0.0.0.0')
