import { ApiTenderData, TenderData } from "./types";

export function transformTenderData(apiTenders: ApiTenderData[]): TenderData[] {
  return apiTenders.map(tender => ({
      id: tender.id,
      tenderName: tender.tender || '',
      serviceType: tender.service_type,
      publicationTime: tender.publish_time,
      publicationDate: new Date(tender.publish_time).toLocaleDateString(),
      status: tender.status as 'תפוס' | 'פנוי',
      driverName: tender.selected_driver
  }));
}

// export function transformTenderData(apiData: ApiTenderData[]): TenderData[] {
//   return apiData.map(item => {
//     const publishDate = new Date(item.publish_time);
    
//     return {
//       id: item.id,
//       tenderName: item.tender || 'לא צוין',
//       serviceType: item.service_type,
//       publicationTime: publishDate.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
//       publicationDate: publishDate.toLocaleDateString('he-IL'),
//       status: item.status === 'פעיל' ? 'פנוי' : 'תפוס',
//       driverName: item.selected_driver
//     };
//   });
// }