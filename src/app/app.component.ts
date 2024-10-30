import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public file: File | undefined;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const target= event.target as HTMLInputElement;
    this.file = (target.files as FileList)[0];
  }

  sendData() {
    if(!this.file) {
      return;
    }

    const formData = new FormData();
    formData.append('attachment', this.file);
    formData.append('data',
        new Blob([
          JSON.stringify({
            date: new Date().toISOString()
          })
        ], { type: 'application/json' }),
    );

    this.http.post("/api/dummy", formData).subscribe();
  }
}
