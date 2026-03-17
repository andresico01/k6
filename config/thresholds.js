export const thresholds = {
  base: {
    http_req_duration: ['p(95)<500'],
  },
  load: {
    http_req_duration: ['p(95)<800'],
    http_req_failed: ['rate<0.01'],
  },
  stress: {
    http_req_duration: ['p(95)<1000'],
    http_req_failed: ['rate<0.05'],
  }
};
