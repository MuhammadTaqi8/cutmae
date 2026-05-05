"""
gunicorn.conf.py — Production Gunicorn configuration.

Usage:
    gunicorn -c gunicorn.conf.py main:app

Tuning notes for a 2–4 vCPU / 4–8 GB RAM VPS
──────────────────────────────────────────────
- workers: (2 × CPU) + 1 is a classic rule of thumb, but for I/O-bound
  async workloads with heavy in-process CPU work (onnxruntime) you often
  get better throughput with workers == number_of_physical_cores.
  Start with 2–4 and benchmark.
- threads: 1 (Uvicorn workers are already async; threads add GIL contention)
- worker_connections: keep high so each async worker can handle many
  in-flight requests while one is waiting on the thread-pool executor.
"""

import multiprocessing
import os

# ── Worker count ──────────────────────────────────────────────────────────────
workers = int(os.getenv("WEB_CONCURRENCY", max(2, multiprocessing.cpu_count())))

# ── Worker class ──────────────────────────────────────────────────────────────
worker_class = "uvicorn.workers.UvicornWorker"

# ── Binding ───────────────────────────────────────────────────────────────────
bind = os.getenv("BIND", "127.0.0.1:8000")

# ── Timeouts ──────────────────────────────────────────────────────────────────
# Inference on CPU can take 3–15 s depending on image size & model.
# Set timeout higher than your worst-case inference time.
timeout = int(os.getenv("WORKER_TIMEOUT", 120))       # hard kill after N s
graceful_timeout = int(os.getenv("GRACEFUL_TIMEOUT", 30))  # drain time on SIGTERM
keepalive = 5                                           # seconds between pings

# ── Worker lifecycle ──────────────────────────────────────────────────────────
# Recycle workers periodically to prevent memory leaks
max_requests = int(os.getenv("MAX_REQUESTS", 1000))
max_requests_jitter = int(os.getenv("MAX_REQUESTS_JITTER", 100))

# ── Logging ───────────────────────────────────────────────────────────────────
accesslog = "-"          # stdout
errorlog = "-"           # stdout
loglevel = os.getenv("LOG_LEVEL", "info").lower()
access_log_format = (
    '{"time":"%(t)s","remote":"%({X-Forwarded-For}i)s",'
    '"method":"%(m)s","path":"%(U)s","status":%(s)s,'
    '"size":%(b)s,"duration_ms":%(D)s}'
)

# ── Process naming ────────────────────────────────────────────────────────────
proc_name = "bgremove"

# ── Security ──────────────────────────────────────────────────────────────────
limit_request_line = 4096
limit_request_fields = 50
limit_request_field_size = 8190

# ── SSL (terminate at Nginx; leave blank here) ────────────────────────────────
# keyfile  = "/etc/letsencrypt/live/example.com/privkey.pem"
# certfile = "/etc/letsencrypt/live/example.com/fullchain.pem"
