import { environment } from '../../../../../../../environments/environment';
import { Squadre, TopUser } from '../../../../interfaces/profilo.interface';
import { chartOptionsSquadre } from '../options/squadre.option';
import { chartOptionsUtenti } from '../options/utenti.option';

declare var google: any;

const mapSquad: Record<string, string> = environment.team.reduce(
  (acc, team, index) => {
    acc[team] = environment.colori[index];
    return acc;
  },
  {} as Record<string, string>
);

export function renderBarChart(topUser: TopUser[], idChart: string): void {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Utente');
  data.addColumn('number', 'Punteggio');
  data.addColumn({ type: 'string', role: 'style' });

  topUser.forEach((s: TopUser) => {
    const colore: string = mapSquad[s.team] || 'gray';
    data.addRow([s.id, s.punteggio, `color: ${colore}`]);
  });

  const chartContainer: HTMLElement | null = document.getElementById(idChart);
  if (!chartContainer) return;

  const chart = new google.visualization.BarChart(chartContainer);
  chart.draw(data, chartOptionsUtenti());
}

export function renderPieChart(squadre: Squadre[], idChart: string): void {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Squadra');
  data.addColumn('number', 'Punteggio');

  squadre.forEach((sq: Squadre) => {
    data.addRow([sq.id, sq.punteggio]);
  });

  const chartContainer: HTMLElement | null = document.getElementById(idChart);
  if (!chartContainer) return;

  const colors: string[] = squadre.map(
    (sq: Squadre) => mapSquad[sq.id] || 'gray'
  );

  const chart = new google.visualization.PieChart(chartContainer);
  chart.draw(data, chartOptionsSquadre(colors));
}
