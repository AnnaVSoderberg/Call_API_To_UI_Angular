// export interface Book{
//     id:string;
//     bookName:string;
//     authorFirstname:string;
//     authorLastname:string;
//     bookGenre:string;
//     yearOfPublication:string;
//     availableForLoan:string;
// }

export enum Genre {
  Fiction = 0,
  BiographiesAndMemoirs,
  HistoricalBooks,
  NonFiction,
  Poetry,
  ChildrensAndYoungAdultLiterature,
  CrimeAndThrillers,
  ScienceFictionAndFantasy,
  SocialSciences,
  ArtAndCulture
}

export interface Book {
    id: number;
    bookName: string;
    authorFirstname: string;
    authorLastname: string;
    bookGenre: Genre;
    yearOfPublication: number;
    availableForLoan: boolean;
  }
  
