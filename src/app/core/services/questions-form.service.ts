import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../base-url';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsFormService {
  questionArr: any = [];
  questIndex: number = 0;
  answers: { questionId: number, answer: string }[] = [];

  constructor(private http:HttpClient) { }

  GetById(id: number){
    return this.http.get<Question[]>(BASE_URL + '/Customers/GetQusetionsByCategory/' + id);
  }

  CreateInsurancePlanRequest(request: any){
    return this.http.post(BASE_URL + '/Customers/requestInsurancePlan', request);
  }
  GetQuestiosArr(id:number){
    this.GetById(id).subscribe((data) => {
      this.questionArr = data;
      // console.log(this.questionArr, 'questionArr from the service ya m3rs');
    });
    // console.log(this.questionArr, 'questionArr after the service ya m3rs');
  }
  getQuestion(){
    return this.questionArr[this.questIndex];
  }
  NextQuestion(){
   if(this.questIndex < this.questionArr.length - 1){
     this.questIndex++;
   }

  }
  PreviousQuestion()
  {
    if(this.questIndex > 0){
      this.questIndex--;
    }

  }
  AddAnswer(answer: string){
   if(this.answers.length == this.questionArr.length )
    {
      return;
    }
    
    this.answers.push({questionId: this.questionArr[this.questIndex].id, answer: answer});
  }
  GetAnswers(){
    return this.answers;
  }

}
