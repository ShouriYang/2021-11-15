import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid'; // import from module

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  db:{id:string, firstName:string, lastName:string,dob:Date,address:{suburb:string, state:string, postcode:number},numberOfPatients:number}[]
  =[];
  docFirstName="";
  docLastName="";
  docDOB=new Date();
  suburb="";
  state="";
  postcode=0;
  numberOfPatients=0;
  doctorsWithoutPaitient_Count=0;

  addDoctor(){
    const newDoc= {
      id: uuidv4(),
      firstName:this.docFirstName,
      lastName:this.docLastName,
      dob:this.docDOB,
      address:{
        suburb:this.suburb, 
        state:this.state, 
        postcode:this.postcode
      },
      numberOfPatients:this.numberOfPatients
    }
    if (newDoc.numberOfPatients===0) {
      this.doctorsWithoutPaitient_Count++;
    }
    this.db.push(newDoc);
  };

  deleteDoctorById(anId:string) {
    for(let i=this.db.length-1;i>=0;i--){
      // check the id
      if ( this.db[i].id === anId){
        // check the number of patients
        if (this.db[i].numberOfPatients===0) {
          if(this.doctorsWithoutPaitient_Count>0){
            this.doctorsWithoutPaitient_Count--;
          }
        }
        this.db.splice(i, 1);
      }
    }
  };

  deleteDoctorWithoutPaitient(){
    for(let i=this.db.length-1;i>=0;i--){
      if ( this.db[i].numberOfPatients===0) {
        // decrease the count by 1 if meet the condition
        if(this.doctorsWithoutPaitient_Count>0){
          this.doctorsWithoutPaitient_Count--;
        }
        this.db.splice(i,1);
      }
    }
  };

  //increasing the patient by one
  increasingPatientNumber(anId:string) {
    for(let i=this.db.length-1;i>=0;i--){
      // check the id
      if ( this.db[i].id === anId){
        // Update the class parameter if meet the condition
        if(this.db[i].numberOfPatients===0){
          this.doctorsWithoutPaitient_Count--;
        }

        // update this document's data property
        this.db[i].numberOfPatients++;

      }
    }
  }
}

