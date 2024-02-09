# PokeDex Project
A simple easy to look at pokedex for Pokemon fans to find images, types, and locations of their searched Pokemon.

**Link to project:** https://relaxed-melba-4defa0.netlify.app/

![alt tag](https://i.ibb.co/0XcpDVy/Screenshot-2024-02-09-at-11-37-36-AM.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

Using the pokeapi.co API we can look up any Pokemons type, image, and locations where to find it. With that info, we populate elements of our app.

## Optimizations

When I initially created the locations area I didn't have it hidden and it was messing with previously searched Pokemon. I had to think about the scope and order of events on the app to get it to where I wanted.
I could hide the locations button if there are no locations, however, that's an additional API request that I'd rather not send until needed.

##Lessons Learned

As stated above I learned that the order of functions being invoked and where data is stored can mess up wanted behaviors of an application.
When I finally got the app to where I wanted it I was so happy, after a couple of weeks I looked at this app and I think it's so simple but I recall how the JavaScript made me think as I was just refreshing my knowledge on API calls.
