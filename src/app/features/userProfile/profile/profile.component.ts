import { Component } from '@angular/core';
import { UploadService } from '../../../core/services/uploadService/upload.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  selectedFile: File | null = null;
  uploadMessage: string | null = null;

  constructor(private uploadService: UploadService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onUpload() {
    if (this.selectedFile) {
      this.uploadService.uploadFile(this.selectedFile).subscribe(
        response => {
          this.uploadMessage = 'File uploaded successfully. URL: ' + response.url;
        },
        error => {
          this.uploadMessage = 'Failed to upload file: ' + error.message;
        }
      );
    } else {
      this.uploadMessage = 'No file selected';
    }
  }
}
