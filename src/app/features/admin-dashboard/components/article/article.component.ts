import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../../core/services/article.service';
import { article } from '../../../../core/models/article';
import { EditableRow, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { MessagesModule } from 'primeng/messages';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    TagModule,
    DropdownModule,
    InputTextareaModule,
    EditorModule,
    MessagesModule,
    ToolbarModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService, MessageService, EditableRow],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit
{

  articles: article[] = [];
  cols: any[] = [];
  loading: boolean = true;
  clonedarticle: article = { id: 0, title: '', content: '', articleImg: ''};

  constructor(
    private service: ArticleService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.loading = true;
    this.getArticles().subscribe((data) => {
      this.articles = data as article[];
      this.loading = false;
    });
  }

  getArticles() {
    return this.service.getArticles()
  }

  onRowEditInit(article: article) {
        this.clonedarticle = { ...article } ;
        console.log(this.clonedarticle);
    }

  onRowEditSave(article: article) {
      return this.service.updateArticle(article).subscribe(() => {
        this.loadArticles();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Article is updated' });
        });
      
    };

  onRowEditCancel(article: article, index: number) {}

  openNew() {
    this.clonedarticle = { id: 0, title: '', content: '', articleImg: ''};
  }

  addArticle(article: article) {
    return this.service.addArticle(article).subscribe(() => {
      this.loadArticles();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Article is added' });
    });
  }

  deleteProduct(event: Event, id: number) {
    this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this article?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass:"p-button-danger p-button-text",
            rejectButtonStyleClass:"p-button-text p-button-text",
            acceptIcon:"none",
            rejectIcon:"none",

            accept: () => {
                return this.service.deleteArticle(id).subscribe(() => {
                  this.loadArticles();
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Article is deleted' });
                });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    
  }
}
