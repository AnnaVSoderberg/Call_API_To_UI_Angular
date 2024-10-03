import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Book, Genre } from './Models/book';
import { BookService } from './Service/book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  // Expose the Genre enum to the template
  public Genre = Genre;

  // Book list and selected book for form
  books: Book[] = [];
  book: Book = {
    id: 0,
    bookName: '',
    authorFirstname: '',
    authorLastname: '',
    bookGenre: Genre.Fiction,  // Default value from enum
    yearOfPublication: 2024,
    availableForLoan: true,
  };

  // Modal-related variables
  showConfirmDialog = false; // För att visa/dölja dialogen
  bookIdToDelete: number | null = null; // Håller koll på boken som ska raderas

  constructor(private bookservice: BookService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookservice.getAllBooks().subscribe((books: Book[]) => {
      this.books = books;
    });
  }

  editBook(book: Book) {
    this.book = { ...book };
  }

  // Hantera öppning av modal när användaren vill radera en bok
  openDeleteDialog(id: number) {
    this.bookIdToDelete = id;
    this.showConfirmDialog = true;
  }

  // Bekräfta radering av boken
  confirmDelete() {
    if (this.bookIdToDelete !== null) {
      this.bookservice.deleteBook(this.bookIdToDelete).subscribe(() => {
        this.getAllBooks();
      });
    }
    this.closeDialog(); // Stäng dialogen efter bekräftelse
  }

  // Avbryta radering och stänga modal
  cancelDelete() {
    this.closeDialog();
  }

  // Stäng modalen och återställ state
  closeDialog() {
    this.showConfirmDialog = false;
    this.bookIdToDelete = null; // Återställ valt bok-ID
  }

  deleteBook(id: number) {
    this.openDeleteDialog(id); // Öppna modalen istället för inbyggd confirm
  }

  getGenreString(genre: Genre): string {
    return Genre[genre];
  }

  getEnumValue(key: string): number {
    return this.Genre[key as keyof typeof Genre];
  }

  onSubmit() {
    if (this.book.id === 0) {
      this.bookservice.addBook(this.book).subscribe(() => {
        this.getAllBooks();
        this.resetForm();
      });
    } else {
      this.bookservice.updateBook(this.book).subscribe(() => {
        this.getAllBooks();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.book = {
      id: 0,
      bookName: '',
      authorFirstname: '',
      authorLastname: '',
      bookGenre: Genre.Fiction,
      yearOfPublication: 2024,
      availableForLoan: true,
    };
  }

  genreEnumKeys(): string[] {
    return Object.keys(this.Genre).filter(key => isNaN(Number(key)));
  }
}
