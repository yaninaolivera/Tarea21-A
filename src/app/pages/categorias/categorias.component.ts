import { Component } from '@angular/core';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  categories: Category[] = [];
  type = "expenses";
  total_expenses = 0;
  total_incomes = 0;
  fecha = new Date();

  constructor(
    private categoriasService: CategoriasService
  ) { }

  ngOnInit() {
    this.categoriasService.categorias().subscribe((data: any) => {
      this.categories = data;
      this.categories.forEach(e=>{
        e.transactions.forEach(i=>{
          if (e.transaction_type === "income") {
            this.total_incomes = this.total_incomes + i.amount;
          }else{
            this.total_expenses = this.total_expenses + i.amount;
          }
        })
      })
    })
  }

  amount(transactions: Array<any>){
    let amount = 0;
    transactions.forEach(element => {
      amount += element.amount;
    });
    return amount
  }

  change_type(value:string){
    this.type = value
  }

  newcategory(category: string) {
    document.getElementById("close_modal")?.click();
    this.ngOnInit();
  }
}
