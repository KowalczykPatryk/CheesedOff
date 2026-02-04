#!/bin/bash
cd frontend
npm run build

cd ../backend
python manage.py collectstatic --noinput

python manage.py runserver 0.0.0.0:5304