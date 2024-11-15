import { Component, OnInit } from '@angular/core';
import { Series } from './series';
import { SeriesService } from './series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})

export class SeriesComponent implements OnInit {
  series: Array<Series> = [];
  averageSeasons: number = 0;

  constructor(private seriesService: SeriesService) { }

  getSeries() {
    this.seriesService.getSeries().subscribe(
      (series) => {
        this.series = series;
        this.calculateAverageSeasons();
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  calculateAverageSeasons() {
    if (this.series.length > 0) {
      const totalSeasons = this.series.reduce((sum, serie) => sum + serie.seasons, 0);
      this.averageSeasons = totalSeasons / this.series.length;
    } else {
      this.averageSeasons = 0;
    }
  }

  ngOnInit() {
    this.getSeries();
  }
}
