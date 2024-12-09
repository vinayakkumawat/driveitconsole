import { ApiTenderData, TenderData } from "@/app/(private)/(pages)/all-tenders/types";

export function transformTenderData(apiData: ApiTenderData[]): TenderData[] {
  return apiData.map(item => {
    const publishDate = new Date(item.publish_time);
    
    return {
      id: item.id,
      tenderName: item.tender || 'לא צוין',
      serviceType: item.service_type,
      publicationTime: publishDate.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
      publicationDate: publishDate.toLocaleDateString('he-IL'),
      status: item.status === 'פעיל' ? 'פנוי' : 'תפוס',
      driverName: item.selected_driver
    };
  });
}