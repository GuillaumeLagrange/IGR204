import math

places = []
popText = ""
    
def setup():
    size(800, 800)
    noLoop()
    readData()
    labelFont = loadFont("MathJax_Fraktur-Regular-48.vlw")
    textFont(labelFont, 32)
    
def draw():
    global popText
    background(255)
    for place in places:
        place.draw(color(0))
    fill(0)
    text(popText, 10, height - 20)

def readData():
    global minX, maxX, minY, maxY
    lines = loadStrings("https://perso.telecom-paristech.fr/eagan/class/igr204/data/population.tsv")
    print "Loaded", len(lines), "lines"
    for line in lines[2:]:
        columns = line.split("\t")
        place = Place()
        place.postalCode = int(columns[0])
        place.longitude = float(columns[1])
        place.latitude = float(columns[2])
        place.name = columns[4]
        place.population = int(columns[5])
        place.density = float(columns[6])
        
        if not(math.isnan(place.longitude) or math.isnan(place.latitude)):
            places.append(place)
        
    Place.minX = min(places, key=lambda place: place.longitude).longitude
    Place.maxX = max(places, key=lambda place: place.longitude).longitude
    Place.minY = min(places, key=lambda place: place.latitude).latitude
    Place.maxY = max(places, key=lambda place: place.latitude).latitude

def mouseMoved():
    global popText
    for place in places:
        if int(place.x) == mouseX and int(place.y) == (height - mouseY):
            popText = str(place.postalCode) + " " + place.name + " Population: " + str(place.population) + " Density: " + str(place.density)
            redraw()
            return

class Place(object):
    minX, maxX = (0, 0)
    minY, maxY = (0, 0)
    
    longitude = 0
    latitude = 0
    name = ""
    postalCode = 0
    population = -1
    density = -1
    
    @property
    def x(self):
        return map(self.longitude, Place.minX, Place.maxX, 0, width)
    
    @property
    def y(self):
        return map(self.latitude, Place.minY, Place.maxY, 0, height)
    
    def draw(self, clr):
        try:
            set(self.x, height - self.y, clr)
        except Exception, e:
            print "Error drawing place at ({}, {}) : {}".format(self.x, self.y, e)