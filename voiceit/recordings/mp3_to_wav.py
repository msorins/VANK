import os
from pydub import AudioSegment

for i, f in enumerate(os.listdir("recordings/mp3/")):
	# Batch mp3 file converter from recordings.
    if f.endswith(".mp3"):
        name = f.split('/')[-1][:-4]
        sound = AudioSegment.from_mp3(os.getcwd() + '/recordings/mp3/%s' % f)
        path = os.getcwd() + "/recordings/wav/"
        sound.export(path + "%s.wav" % name, format="wav")

print('WAV converted MP3 files saved in %s' % path)