import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GererCategoriesService } from '../services/gerer-categories.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string = '';
  filteredAnnonces: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoryService: GererCategoriesService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['term'] || '';
      this.searchAnnonces();
    });
  }

  searchAnnonces(): void {
    if (this.searchTerm) {
      this.categoryService.searchAnnonces(this.searchTerm).subscribe(annonces => {
        this.filteredAnnonces = annonces;
      });
    }
  }

}
