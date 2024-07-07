// src/app/plans/plans.component.ts
import { Component, OnInit } from '@angular/core';
import { getRequsestsService } from "../../../core/services/userProfile/getRequests.services"
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plans',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  pendingRequests: any[] = [];
  paidRequests: any[] = [];
  approvedButNotPaidRequests: any[] = [];
  rejectedRequests: any[] = [];

  constructor(private getRequsestsService: getRequsestsService) {}

  ngOnInit(): void {
    this.loadPendingRequests();
    this.loadPaidRequests();
    this.loadApprovedButNotPaidRequests();
    this.loadRejectedRequests();
  }

  loadPendingRequests(): void {
    this.getRequsestsService.getUserRequestsWithPendingStatus().subscribe({
      next: (data) => this.pendingRequests = data,
      error: (err) => console.error('Error loading pending requests', err)
    });
  }

  loadPaidRequests(): void {
    this.getRequsestsService.getRequestsWithPaidTrue().subscribe({
      next: (data) => this.paidRequests = data,
      error: (err) => console.error('Error loading paid requests', err)
    });
  }

  loadApprovedButNotPaidRequests(): void {
    this.getRequsestsService.getRequestsWithApprovedStatusButNotPaid().subscribe({
      next: (data) => this.approvedButNotPaidRequests = data,
      error: (err) => console.error('Error loading approved but not paid requests', err)
    });
  }

  loadRejectedRequests(): void {
    this.getRequsestsService.getRequestsWithRejectedStatus().subscribe({
      next: (data) => this.rejectedRequests = data,
      error: (err) => console.error('Error loading rejected requests', err)
    });
  }
}
