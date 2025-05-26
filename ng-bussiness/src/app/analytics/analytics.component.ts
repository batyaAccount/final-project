import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UsersService } from '../../service/users.service';


@Component({
  selector: 'app-analytics',
  imports: [BaseChartDirective],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit {
  constructor( private usersService: UsersService) {}

  // הגדרת דיאגרמת העמודות (Bar chart)
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar', number[], string> = {
    labels: [],  // חודשים
    datasets: [
      {
        data: [],  // מספר המשתמשים
        label: 'מספר נרשמים לכל חודש',
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1
      }
    ]
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'פילוח נרשמים לפי חודש'
      }
    }
  };

  ngOnInit(): void {
   
    // קריאה למידע על מספר נרשמים לכל חודש
    this.usersService.getUsersPerMonth().subscribe(data => {
      const months = [
        'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 
        'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
      ];
      this.barChartData = {
        labels: months, // החודשים
        datasets: [
          {
            data: data, // הנתונים שהתקבלו מהמאגרים
            label: 'מספר נרשמים לכל חודש',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            borderWidth: 1
          }
        ]
      };
    });
  }
}
