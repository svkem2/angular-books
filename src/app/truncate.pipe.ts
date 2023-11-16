import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(text: string, sentences: number = 2): string {
    const sentenceArray = text.split('. '); // Split the text into sentences
    const truncatedText = sentenceArray.slice(0, sentences).join('. '); // Join the first 'sentences' sentences
    return truncatedText;
  }
}
