import { Component } from '@angular/core';
import { elementAt } from 'rxjs';
import { Category, Results } from 'src/app/models/category.model';
import { CategoriasService } from 'src/app/servicios/categorias.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  filter = {min: 0, max: 0, from: "", to: "", status:true}
  categories: Category[] = [];
  data_categories: Category[] = [];
  results: Results[] = [];
  categories_list: Array<number> = []
  
  constructor(
    private categoriasService: CategoriasService
  ) { }

  ngOnInit() {
    this.categoriasService.categorias().subscribe((data: any) => {
      this.data_categories = data;
      this.filtrar_data(data);
    })
  }

  categories_filter(id: number, eve: any) {
    if (eve.target.checked === true) {
      this.categories_list.push(id);
    } else {
      let index = this.categories_list.findIndex(d => d === id)
      this.categories_list.splice(index, 1);
    }

    this.filter_transactions();
  }

  filter_transactions(){
    this.categoriasService.categorias().subscribe((data: any) => {
      this.filtrar_data(data)
    })
  }

  filtrar_data(data:any) {
    this.categories = data;
    this.results = [];
    this.categories.forEach(el => {
      el.transactions.forEach(e => {
        let exists = this.results.filter(r => r.date === e.date);
        if (exists.length === 0) {
          this.results.push(
            {
              id: this.results.length + 1, amount: 0, date: e.date, type: el.transaction_type, operations: [
                { id: e.id, category_id: el.id, description: e.notes, amount: e.amount, type: el.transaction_type, 
                  icon: el.icon, color: el.color, name: el.name }
              ]
            }
          )
        } else {
          let index = this.results.indexOf(exists[0]);
          this.results[index].operations.push(
            { id: e.id, category_id: el.id, description: e.notes, amount: e.amount, type: el.transaction_type, 
              icon: el.icon, color: el.color, name: el.name }
          );
        }
      })
    })

    this.results.sort((a, b) => String(b.date).localeCompare(String(a.date)));

    if (this.categories_list.length > 0) {
      this.results.forEach((value, key) => {
        this.results[key].operations = this.results[key].operations.filter(
          e => this.categories_list.includes(e.category_id)
        );
      })
    }

    if (this.filter.from !== "" && this.filter.to !== "") {
      this.results = this.results.filter((e) => {
        let date = new Date(e.date).getTime();
        let from = new Date(this.filter.from).getTime();
        let today = new Date(this.filter.to);
        let to = new Date(today.setDate(today.getDate() + 1)).getTime();
        return date >= from && date <= to;
      });
    }

    if (this.filter.min > 0 && this.filter.max > 0) {
      for (let i = 0; i < this.results.length; i++) {
        this.results[i].operations = this.results[i].operations.filter((obj) => {
          return (obj.amount >= this.filter.min && obj.amount <= this.filter.max);
        });
      }
    }
  }

  amount(transactions: Array<any>) {
    let amount = 0;
    transactions.forEach(element => {
      if (element.type === "expense") {
        amount -= element.amount;
      } else {
        amount += element.amount;
      }
    });
    return amount
  }

  create_date(date: string) {
    return new Date(date)
  }

  status_filter() {
    this.filter.status = !this.filter.status;
  }
}
