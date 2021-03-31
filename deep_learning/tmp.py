import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

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
import datetime
import matplotlib.pyplot as plt
import tensorflow as tf


# Code for Correcting Error
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    try:
        # Currently, memory growth needs to be the same across GPUs
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
        logical_gpus = tf.config.experimental.list_logical_devices('GPU')
        print(len(gpus), "Physical GPUs,", len(logical_gpus), "Logical GPUs")
    except RuntimeError as e:
        # Memory growth must be set before GPUs have been initialized
        print(e)


# Define Print Progress Bar Function
def print_progress(iteration, total, prefix='>> Progress:', suffix='Complete', decimals=1, bar_length=55):
    str_format = "{0:." + str(decimals) + "f}"
    current_progress = iteration / float(total)
    percents = str_format.format(100 * current_progress)
    filled_length = int(round(bar_length * current_progress))
    bar = "■" * filled_length + '□' * (bar_length - filled_length)
    sys.stdout.write('\r%s |%s| %s%s %s' % (prefix, bar, percents, '%', suffix)),
    if iteration == total:
        sys.stdout.write('\n')
    sys.stdout.flush()


# Set Basic Parameters
# # Training Data Path (Directory)
train_dir = "./dataset/train_data/"
validation_dir = "./dataset/validation_data/"
# # Classes => Types of Fish
types = os.listdir(train_dir)
# # Number of Classes
cnt = len(types)
# # Size of Images
img_height = 112
img_width = 112


# Parsing Images
# # Parsing Training Image
x_train = []
y_train = []
# ## Image Parsing Process
print("\nTraining Image Parsing Started")
for idx, type in enumerate(types):
    print("<" + type + "> Image Parsing Progressing")
    label = [0 for i in range(cnt)]
    label[idx] = 1
    img_dir = train_dir + type + '/'
    for top, folder, file in os.walk(img_dir):
        for filename in file:
            print_progress(file.index(filename) + 1, len(file))
            img = Image.open(img_dir + filename)
            img = img.convert("RGB")
            img = img.resize((img_width, img_height))
            img_data = np.asarray(img)
            x_train.append(img_data/255)
            y_train.append(label)
x_train = np.array(x_train)
y_train = np.array(y_train)
print("Training Image Parsing Finished")
# # Parsing Validation Image
x_val = []
y_val = []
# ## Image Parsing Process
print("\nValidation Image Parsing Started")
for idx, type in enumerate(types):
    print("<" + type + "> Image Parsing Progressing")
    label = [0 for i in range(cnt)]
    label[idx] = 1
    img_dir = validation_dir + type + '/'
    for top, folder, file in os.walk(img_dir):
        for filename in file:
            print_progress(file.index(filename) + 1, len(file))
            img = Image.open(img_dir + filename)
            img = img.convert("RGB")
            img = img.resize((img_width, img_height))
            img_data = np.asarray(img)
            x_val.append(img_data/255)
            y_val.append(label)
x_val = np.array(x_val)
y_val = np.array(y_val)
print("Validation Image Parsing Finished\n")


# Build CNN Model
Fish_Classifier = Sequential()
# # Feature Extraction Layer
# ## Convolution Layer
Fish_Classifier.add(Conv2D(input_shape=(img_width, img_height, 3), filters=64, kernel_size=(3, 3), strides=(1, 1),
                           padding='same', kernel_regularizer=l2(0.001)))
Fish_Classifier.add(BatchNormalization())
Fish_Classifier.add(Activation('relu'))
Fish_Classifier.add(Conv2D(filters=64, kernel_size=(3, 3), strides=(1, 1), padding='same',
                           kernel_regularizer=l2(0.001)))
Fish_Classifier.add(BatchNormalization())
Fish_Classifier.add(Activation('relu'))
# ## Pooling Layer (Max Pooling)
Fish_Classifier.add(MaxPool2D(pool_size=(2, 2), strides=(2, 2)))
Fish_Classifier.add(Conv2D(filters=128, kernel_size=(3, 3), strides=(1, 1), padding='same',
                           kernel_regularizer=l2(0.001)))
Fish_Classifier.add(BatchNormalization())
Fish_Classifier.add(Activation('relu'))
Fish_Classifier.add(Conv2D(filters=128, kernel_size=(3, 3), strides=(1, 1), padding='same',
                           kernel_regularizer=l2(0.001)))
Fish_Classifier.add(BatchNormalization())
Fish_Classifier.add(Activation('relu'))
Fish_Classifier.add(MaxPool2D(pool_size=(2, 2), strides=(2, 2)))
Fish_Classifier.add(Conv2D(filters=256, kernel_size=(3, 3), strides=(1, 1), padding='same',
                           kernel_regularizer=l2(0.001)))
Fish_Classifier.add(BatchNormalization())
Fish_Classifier.add(Activation('relu'))
Fish_Classifier.add(Conv2D(filters=256, kernel_size=(3, 3), strides=(1, 1), padding='same',
                           kernel_regularizer=l2(0.001)))
Fish_Classifier.add(BatchNormalization())
Fish_Classifier.add(Activation('relu'))
Fish_Classifier.add(Conv2D(filters=256, kernel_size=(3, 3), strides=(1, 1), padding='same',
                           kernel_regularizer=l2(0.001)))
Fish_Classifier.add(BatchNormalization())
Fish_Classifier.add(Activation('relu'))
Fish_Classifier.add(MaxPool2D(pool_size=(2, 2), strides=(2, 2)))
Fish_Classifier.add(Conv2D(filters=512, kernel_size=(3, 3), strides=(1, 1), padding='same',
                           kernel_regularizer=l2(0.001)))
Fish_Classifier.add(BatchNormalization())
Fish_Classifier.add(Activation('relu'))
Fish_Classifier.add(Conv2D(filters=512, kernel_size=(3, 3), strides=(1, 1), padding='same',
                           kernel_regularizer=l2(0.001)))
Fish_Classifier.add(BatchNormalization())
Fish_Classifier.add(Activation('relu'))
Fish_Classifier.add(Conv2D(filters=512, kernel_size=(3, 3), strides=(1, 1), padding='same',
                           kernel_regularizer=l2(0.001)))
Fish_Classifier.add(BatchNormalization())
Fish_Classifier.add(Activation('relu'))
Fish_Classifier.add(MaxPool2D(pool_size=(2, 2), strides=(2, 2)))
# # Fully-Connected Layer
Fish_Classifier.add(Flatten())
Fish_Classifier.add(Dense(4096, activation='relu'))
Fish_Classifier.add(Dropout(0.5))
Fish_Classifier.add(Dense(4096, activation='relu'))
Fish_Classifier.add(Dropout(0.5))
# ## Output Layer
Fish_Classifier.add(Dense(cnt, activation='softmax'))
# # Set Optimizer (RMSprop) and Learning Rate
# #### The smaller the learning rate, the slower the training speed,
# #### but the higher the possibility that the performance of the model is good,
# #### and the larger the learning rate is, the faster the training speed,
# #### but the higher the possibility that the performance of the model is less good.
#lr_decay = ExponentialDecay(initial_learning_rate=0.1, decay_steps=1, decay_rate=0.9)
opt = RMSprop(learning_rate=0.00001)
Fish_Classifier.compile(loss='categorical_crossentropy', optimizer=opt, metrics=['acc'])

Fish_Classifier.summary()

# Set Training Condition
Datetime = datetime.datetime.now().strftime('%m%d_%H%M')
# # Set Saving Path of Trained Model
Check_Pointer = ModelCheckpoint(filepath="fish_classification.h5", monitor='val_loss', verbose=1, save_best_only=True)
Early_Stopping_Callback = EarlyStopping(monitor='val_loss', patience=1000)
# # Train Model
history = Fish_Classifier.fit(x_train, y_train, epochs=1000, batch_size=16, verbose=1, validation_data=(x_val, y_val),
                              callbacks=[Early_Stopping_Callback, Check_Pointer])


# Visualize Training Process and Result
fig, loss_ax = plt.subplots()
acc_ax = loss_ax.twinx()
loss_ax.plot(history.history['loss'], 'y', label='train loss')
loss_ax.plot(history.history['val_loss'], 'r', label='val loss')
acc_ax.plot(history.history['acc'], 'b', label='train acc')
acc_ax.plot(history.history['val_acc'], 'g', label='val acc')
loss_ax.set_xlabel('epoch')
loss_ax.set_ylabel('loss')
acc_ax.set_ylabel('accuracy')
loss_ax.legend(loc='upper left')
acc_ax.legend(loc='lower left')
plt.show()