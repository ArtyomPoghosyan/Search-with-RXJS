import { AppService } from './appService';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  public form!: FormGroup
  public list: any[] = []
  private _searchSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private _appService: AppService,
    private _fb: FormBuilder
  ) { }

  private _formInIt() {
    this.form = this._fb.group({
      searchData: [""]
    })
  }

  public ngOnInit(): void {
    this._formInIt()
  }

  onSearch(event: any) {
    let value = event.target.value;
    this._searchSubject.next(value);

  }

  ngAfterViewInit(): void {

    // this._searchSubject
    //   .pipe(
    //     debounceTime(500),
    //     distinctUntilChanged()
    //   )
    //   .subscribe(resp=>{
    //     this._getBooksfromGoogleApi(resp)
    //   })

    this.form.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(resp => {
        this._getBooksfromGoogleApi(resp.searchData)
      })
  }

  private _getBooksfromGoogleApi(value: any) {
    console.log(value)
    if (value.length >= 3) {
      this._appService.getBooks(value)
        .subscribe(
          resp => this.list.push(resp),
          erorr => {
            this.list = []
          })
    }
    else {
      this.list = []
    }
  }





  // ngAfterViewInit(): void {
  //   this._subjectKEyUp
  //   .pipe(
  //     debounceTime(500),
  //     distinctUntilChanged(),
  //   )
  //   .subscribe((resp:any) => {
  //     this.getGoogleBooks(resp)
  //   })
  // }

  // public onSearch(event: any) {
  //   const value = event.target.value;
  //   this._subjectKEyUp.next(value);
  // }

  // public getGoogleBooks(value: string) {
  //   this._appService.getBooks(value)
  //     .subscribe((resp: any) => {
  //       console.log(resp.items)
  //       this.list.push(resp)
  //     },
  //       (error: Error) => {
  //         console.log(error)
  //       })
  // }

  public tracksBy(index: any, item: any): number {
    return index
  }
}
