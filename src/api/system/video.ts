import { request } from '@/utils/http/axios';

export function getCamLink(cameraIndexCode: string) {
  return request({
    url: `/api/iot/camera/${cameraIndexCode}`,
    method: 'get'
  });
}
