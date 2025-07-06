import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'interest-calculator';
  ngOnInit(): void {
    setTimeout(() => {
      const blackScreen = document.getElementById('black-screen');
      if (blackScreen) {
        blackScreen.classList.add('hidden');
        setTimeout(() => blackScreen.remove(), 1000); // remove após fade
      }
    }, 5000); // 10 segundos
  }
}
