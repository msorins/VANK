from pydub import AudioSegment
import os


for i, f in enumerate(os.listdir("recordings/mp4/")):
    if f.endswith(".mp4"):
        name = f.split('/')[-1][:-4]
        sound = AudioSegment.from_file(os.getcwd() + '/recordings/mp4/%s' % f, "mp4")
        path = os.getcwd() + "/recordings/wav/"
        sound.export("%s.wav" % name, format="wav")

print('WAV converted MP4 files saved in %s' % path)