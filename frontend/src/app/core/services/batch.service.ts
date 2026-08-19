import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Batch, BatchListParams, BatchStatus, CreateBatchRequest, DashboardStats, PaginatedResponse, TraceEvent, UpdateStatusRequest } from '../models/batch.models';

@Injectable({ providedIn: 'root' })
export class BatchService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/v1`;

  getBatches(params: BatchListParams = {}): Observable<PaginatedResponse<Batch>> {
    let httpParams = new HttpParams();
    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.limit) httpParams = httpParams.set('limit', params.limit.toString());
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.status) httpParams = httpParams.set('status', params.status);

    return this.http.get<PaginatedResponse<Batch>>(`${this.baseUrl}/batches`, {
      params: httpParams,
      withCredentials: true,
    });
  }

  getBatch(id: string): Observable<Batch> {
    return this.http.get<Batch>(`${this.baseUrl}/batches/${id}`, { withCredentials: true });
  }

  createBatch(data: CreateBatchRequest): Observable<Batch> {
    return this.http.post<Batch>(`${this.baseUrl}/batches`, data, { withCredentials: true });
  }

  updateBatchStatus(id: string, data: UpdateStatusRequest): Observable<Batch> {
    return this.http.patch<Batch>(`${this.baseUrl}/batches/${id}/status`, data, { withCredentials: true });
  }

  archiveBatch(id: string): Observable<Batch> {
    return this.http.patch<Batch>(`${this.baseUrl}/batches/${id}/archive`, {}, { withCredentials: true });
  }

  unarchiveBatch(id: string): Observable<Batch> {
    return this.http.patch<Batch>(`${this.baseUrl}/batches/${id}/unarchive`, {}, { withCredentials: true });
  }

  getTraceEvents(batchId: string): Observable<TraceEvent[]> {
    return this.http.get<TraceEvent[]>(`${this.baseUrl}/batches/${batchId}/traces`, { withCredentials: true });
  }

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.baseUrl}/dashboard/stats`, { withCredentials: true });
  }

  getRecentBatches(limit = 5): Observable<Batch[]> {
    return this.http.get<Batch[]>(`${this.baseUrl}/batches`, {
      params: { limit: limit.toString(), sort: 'createdAt', order: 'desc' },
      withCredentials: true,
    });
  }
}
