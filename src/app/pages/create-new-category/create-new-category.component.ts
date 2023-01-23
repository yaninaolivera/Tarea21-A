import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { CategoriasService } from 'src/app/servicios/categorias.service';

@Component({
  selector: 'app-create-new-category',
  templateUrl: './create-new-category.component.html',
  styleUrls: ['./create-new-category.component.css']
})
export class CreateNewCategoryComponent {
  new_categoryForm = new FormGroup({
    name: new FormControl(''),
    transaction_type: new FormControl('')
  });

  colors = ["red", "orange", "yellow", "green", "teal", "cyan", "light-blue", "blue"];
  icons = ["bank", "cart", "health", "game", "bill", "education", "car", "gift"];

  category: Category = {
    id: 0,
    name: "",
    transaction_type: "",
    color: "",
    icon: "",
    transactions: []
  }

  @Output() newcategoryevent = new EventEmitter<string>();

  constructor(
    private categoriasService: CategoriasService
  ) { }

  onSubmit(form: NgForm): void {
    this.categoriasService.crear_categoria(JSON.stringify(this.category)).subscribe((data: any) => {
      this.newcategoryevent.emit('data');
      alert("Creado")
    })
  }

  select_color(item: string) {
    this.category.color = item
  }

  select_icon(item: string) {
    this.category.icon = item
  }
}

