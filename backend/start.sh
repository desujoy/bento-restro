echo "Migrating database..."
python manage.py migrate
echo "Collecting static files..."
python manage.py collectstatic
echo "Loading fixtures..."
python manage.py loaddata fixtures/categories.json
python manage.py loaddata fixtures/food-items.json
echo "Starting server..."
python manage.py runserver 0.0.0.0:8000