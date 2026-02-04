#!/bin/bash
cd frontend
npm run build

cd ../backend
source .venv/bin/activate
pip install -r requirements.txt --break-system-packages
python manage.py collectstatic --noinput

python manage.py runserver 0.0.0.0:5304