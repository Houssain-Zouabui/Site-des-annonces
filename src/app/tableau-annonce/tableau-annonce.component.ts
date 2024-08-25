import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { GestionannonceService } from '../services/gestionannonce.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
@Component({
  selector: 'app-tableau-annonce',
  templateUrl: './tableau-annonce.component.html',
  styleUrls: ['./tableau-annonce.component.css']
})
export class TableauAnnonceComponent implements OnInit {
  @ViewChild('content', { static: true }) modalContent!: TemplateRef<any>;
  annonces: any[] = []; // Replace with your actual data source type
  selectedAnnonce: any = {}; // Replace with your actual data model type

  constructor(
    private modalService: NgbModal,
    private annonceService: GestionannonceService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.annonceService.getUserAnnouncements().subscribe(
      data => {
        this.annonces = data;
        console.log('Fetched annonces:', this.annonces);
      },
      error => {
        console.error('Error fetching annonces:', error);
      }
    );
  }

  openModal(content: TemplateRef<any>): void {
    this.modalService.open(content, { ariaLabelledBy: 'exampleModalLabel' });
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  editAnnonce(annonce: any): void {
    this.selectedAnnonce = annonce;
    this.openModal(this.modalContent);
  }

  deleteAnnonce(annonceId: string) {
    if (confirm('Are you sure you want to delete this annonce?')) {
      this.annonceService.deleteAnnonce(annonceId).then(() => {
        console.log('Annonce deleted:', annonceId);
        this.annonces = this.annonces.filter(a => a.id !== annonceId); // Remove from local array
      }).catch(error => {
        console.error('Error deleting annonce:', error);
      });
    }
  }
  async updateAnnonce(): Promise<void> {
    try {
      await this.firestore.doc(`annonce/${this.selectedAnnonce.id}`).update({
        titre: this.selectedAnnonce.titre,
        description: this.selectedAnnonce.description,
        prix: this.selectedAnnonce.prix,
        image: this.selectedAnnonce.image
      });
      console.log('Annonce updated successfully');

      // Met à jour localement la liste des annonces après la modification
      const index = this.annonces.findIndex(a => a.id === this.selectedAnnonce.id);
      if (index !== -1) {
        this.annonces[index] = this.selectedAnnonce;
      }

      this.closeModal();
    } catch (error) {
      console.error('Error updating annonce:', error);
    }
  }

  }
