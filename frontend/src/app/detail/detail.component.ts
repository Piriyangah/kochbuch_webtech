import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Member } from '../shared/member';

/* irgendwas stimmt nicht, submit geht nicht und Skript FE-BE-Anbindung von WS 22 und 23 unterschiedlich*/

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: string = '';
  member!: Member;
  form = new FormGroup({
    firstnameControl: new FormControl<string>(''),
    lastnameControl: new FormControl<string>(''),
    emailControl: new FormControl<string>(''),
    ipaddressControl: new FormControl<string>(''),
  });

  constructor(
    private route: ActivatedRoute,
    private bs: BackendService,
    private fb: FormBuilder,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.readOne(this.id);

  }

  readOne(id: string): void {
    this.bs.getOne(id).subscribe(
      {
        next: (response) => {
          this.member = response;
          console.log('member', this.member);
          this.form.patchValue({
            firstnameControl: this.member?.forename,
            lastnameControl: this.member?.surname,
            emailControl: this.member?.email,
            ipaddressControl: this.member?.ipaddress
          })
          return this.member;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getOne() completed')
      });

  }

  update(): void {

  }

  cancel(): void {
    this.location.back();
  }


}
