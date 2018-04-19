import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  optionsPie: any;
  optionsLine: any;
  pieChartData: any;
  lineChartData: any;

  constructor(
    private dashboardService: DashboardService,
    private decimalPipe: DecimalPipe,
  ) { }

  ngOnInit() {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria()
      .then(dados => {
        this.pieChartData = {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: ['blue', 'yellow', 'red', 'purple',
                                'cyan', 'silver', 'grey', 'black',
                                'orange', 'olive', 'navy', 'sky']
            }
          ]
        };
      });

    this.optionsPie = {
      legend: {
          position: 'right'
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const valor = dataset.data[tooltipItem.index];
            const label = dataset.label ? (dataset.label + ': ') :
              (data.labels[tooltipItem.index] + ': ');

            return label + this.decimalPipe.transform(valor, '1.2-2');
          }
        }
      }
    };
  }

  configurarGraficoLinha() {
    this.dashboardService.lancamentosPorDia()
      .then(dados => {
        const diasDoMes = this.retornaDiasDoMes();
        const totaisReceitas = this.totaisPorCadaDiaMes(
          dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes, 1);
        const totaisDespesas = this.totaisPorCadaDiaMes(
          dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes, -1);
        this.lineChartData = {
          labels: diasDoMes,
          datasets: [
            {
              label: 'Receitas',
              data: totaisReceitas,
              borderColor: '#3366CC'
            }, {
              label: 'Despesas',
              data: totaisDespesas,
              borderColor: '#D62B00'
            }
          ]
        };
      });

    this.optionsLine = {
      legend: {
        position: 'bottom'
      },
      tooltips: {
        mode: 'index',
        callbacks: {
          title: (tooltipItem, data) => {
            return 'Dia ' + tooltipItem[0].xLabel;
          },
          label: (tooltipItem, data) => {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const valor = dataset.data[tooltipItem.index];
            const label = dataset.label ? (dataset.label + ': ') :
              (data.labels[tooltipItem.index] + ': ');

            return label + this.decimalPipe.transform(valor, '1.2-2');
          },
          footer: (tooltipItems, data) => {
            let sum = 0;
            tooltipItems.forEach(function(tooltipItem) {
              sum += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            });
            return 'Total: ' + this.decimalPipe.transform(sum, '1.2-2');
          },
        },
        footerFontStyle: 'bold'
      },
      hover: {
        mode: 'index',
        intersect: true
      }
    };
  }

  private totaisPorCadaDiaMes(dados, diasDoMes, fator) {
    const totais: number[] = [];
    for (const dia of diasDoMes) {
      let total = 0;
      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total * fator;
          break;
        }
      }
      totais.push(total);
    }
    return totais;
  }

  private retornaDiasDoMes() {
    const hoje = new Date();
    const qtdeDias = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate();
    return Array.from(new Array( qtdeDias ), (val, index) => index + 1);
  }

}
