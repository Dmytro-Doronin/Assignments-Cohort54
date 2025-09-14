/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/2-Browsers/Week1#exercise-3-the-logo-hijack

1. Find out how to select the element that contains the Google logo, and store 
   it in a variable.
2. Modify the `src` and `srcset` of the logo so that it's replaced by the 
   HackYourFuture logo instead.
------------------------------------------------------------------------------*/
function hijackGoogleLogo() {
  const logoSvg = document.querySelector('svg.lnXdpd');
  const hyfLogo =
    'https://raw.githubusercontent.com/HackYourFuture/Assignments/main/assets/hyf-logo-black-bg-small.png';

  if (logoSvg) {
    const img = document.createElement('img')
    img.src = hyfLogo
    img.srcset = hyfLogo
    img.alt = 'HackYourFuture'
    img.style.maxHeight = '92px'
    img.className = 'lnXdpd'

    logoSvg.replaceWith(img)
  } else {
    console.log('Error: logo not found')
  }
}

hijackGoogleLogo()
