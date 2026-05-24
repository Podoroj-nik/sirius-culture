import type { CulturalObjectProperties } from '../types';

/**
 * @param object - объект культурного наследия
 * @param userLat - широта пользователя
 * @param userLng - долгота пользователя
 * @returns URL для открытия в новой вкладке
 */
export function buildRouteUrl(
  object: CulturalObjectProperties,
  userLat?: number,
  userLng?: number
): string {
  const isMobile = /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent);

  const baseUrl = 'https://yandex.ru/maps/';

  if (userLat !== undefined && userLng !== undefined) {
    const routeString = `${userLat},${userLng}~${object.externalMapUrl.match(/~(.+)/)?.[1] || ''}`;

    if (isMobile) {
      return `yandexmaps://maps.yandex.ru/?rtext=${routeString}&rtt=auto`;
    }

    return `${baseUrl}?rtext=${routeString}&rtt=auto`;
  }

  const coordsMatch = object.externalMapUrl.match(/~(.+)/);
  if (coordsMatch) {
    const [lat, lng] = coordsMatch[1].split(',');

    if (isMobile) {
      return `yandexmaps://maps.yandex.ru/?pt=${lng},${lat}&z=16`;
    }

    return `${baseUrl}?pt=${lng},${lat}&z=16`;
  }

  return object.externalMapUrl;
}


export function isMobileDevice(): boolean {
  return /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent);
}