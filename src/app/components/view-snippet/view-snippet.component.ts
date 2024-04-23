import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-snippet',
  standalone: true,
  imports: [],
  templateUrl: './view-snippet.component.html',
  styleUrl: './view-snippet.component.css'
})
export class ViewSnippetComponent{
  constructor(private dbService: DbService, private route: ActivatedRoute) { }
  codeSnippet = {
    title: "",
    code: ""
  };

  ngOnInit() {
    const docId = this.route.snapshot.paramMap.get('id');
    this.dbService.getSnippetById(docId!).then((data: any) => {
      this.codeSnippet = data;
    })
  }
}
