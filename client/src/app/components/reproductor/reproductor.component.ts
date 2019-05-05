import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  triggerToggler() {
    let react = document.querySelector(".react");
    let iconBtn = document.querySelector('#iconBtnToggler');
    if (react.classList.contains("d-none")) {
      react.classList.remove('d-none');
      react.classList.add('d-flex'); iconBtn.classList.remove('fa-chevron-circle-up');
      iconBtn.classList.add('fa-chevron-circle-down');

    } else if (react.classList.contains("d-flex")) {
      react.classList.remove('d-flex');
      react.classList.add('d-none');
      iconBtn.classList.remove('fa-chevron-circle-down');
      iconBtn.classList.add('fa-chevron-circle-up');
    }
  }

}
