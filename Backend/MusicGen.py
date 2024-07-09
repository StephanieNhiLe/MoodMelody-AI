import torch
from transformers import AutoProcessor, MusicgenForConditionalGeneration
import scipy
from moviepy.editor import AudioFileClip, VideoFileClip, CompositeAudioClip, concatenate_audioclips

class MusicGen:
    def __init__(self):
        self.processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
        self.model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")

    def generate_music(self, inputs):
        try:
            inputs = self.processor(
                text=inputs,
                padding=True,
                return_tensors="pt",
            )
            audio_values = self.model.generate(**inputs, max_new_tokens=256)
            sampling_rate = self.model.config.audio_encoder.sampling_rate
            scipy.io.wavfile.write("musicgen_out.wav", rate=sampling_rate, data=audio_values[0, 0].numpy())
        except Exception as e:
            raise Exception(f"Error generating music: {str(e)}")

    def add_background_music(self, video_path):
        with VideoFileClip(video_path) as video_clip:
            with AudioFileClip("musicgen_out.wav") as audio_clip:
                if audio_clip.duration < video_clip.duration:
                    repeats = int(video_clip.duration / audio_clip.duration) + 1
                    audio_clip = concatenate_audioclips([audio_clip] * repeats)
                audio_clip = audio_clip.subclip(0, video_clip.duration)
                audio_clip = audio_clip.volumex(0.5)
                new_audio = CompositeAudioClip([video_clip.audio, audio_clip])
                final_clip = video_clip.set_audio(new_audio)
                output_path = "output.mp4"
                final_clip.write_videofile(output_path, codec='libx264', audio_codec='aac')
        return output_path
