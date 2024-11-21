import { pipeline } from '@huggingface/transformers';

class EmotionPipeline {
  static task = 'translation';
  static model = 'borisn70/bert-43-multilabel-emotion-detection';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}