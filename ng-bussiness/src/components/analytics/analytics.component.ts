import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { UsersService } from '../../service/users.service';
import { NgChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-analytics',
  imports: [NgChartsModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit {
  constructor(private usersService: UsersService) { }


  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#42A5F5', '#66BB6A'], // צבעים יפים
      }
    ]
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'התפלגות שיעורים לפי הרשאות'
      }
    }
  };

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
    // קריאה למידע על שיעורים והתפלגות הרשאות
    this.usersService.GetClientPlusAccountant().subscribe(data => {
      this.pieChartData = {
        labels: ['Accountants', 'Clients'],
        datasets: [
          {
            data: [data[0], data[1]],
            backgroundColor: ['#42A5F5', '#66BB6A']
          }
        ]
      };
    });
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
