
import peewee as pw
from pydantic import Json
from dotenv import load_dotenv

load_dotenv()
import os

connectDb = pw.MySQLDatabase(
    host=os.getenv("HOST"),
    user=os.getenv("USERNAME"),
    passwd=os.getenv("PASSWORD"),
    database=os.getenv("DATABASE"),
    autocommit=True,
    ssl_mode="VERIFY_IDENTITY",
    ssl={
        "ca": "/etc/ssl/cert.pem"
    }
)



class BaseModel(pw.Model):
    """A base model that will use our MySQL database"""

    class Meta:
        database = connectDb

class JSONField(pw.TextField):
    """
    Class to "fake" a JSON field with a text field. Not efficient but works nicely
    """
    def db_value(self, value):
        """Convert the python value for storage in the database."""
        return value if value is None else json.dumps(value)

    def python_value(self, value):
        """Convert the database value to a pythonic value."""
        return value if value is None else json.loads(value)

class ApiSchema(pw.Model):
    id = pw.CharField(primary_key=True)
    projectId = pw.CharField(unique=True)
    schema = Json

    class Meta:
        database = connectDb
        db_table = 'ApiSchema'


connectDb.connect()