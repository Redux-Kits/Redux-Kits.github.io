---
layout: tutorial
title: "ACA MinMax"
categories: 
  - build guide
author:
  - 6L6
tags: 
  - amplifier
difficulty:
  - easy
bom:
  graphics: ["MinMax-L-Assembly-Graphic.svg" , "MinMax-R-Assembly-Graphic.svg"]
  components:
    - board_reference: ["-"]
      part: "PCB Left"
      generic_part: "board"
      quantity: 1
      data: {}
    - board_reference: ["-"]
      part: "PCB Right"
      generic_part: "board"
      quantity: 1
      data: {}
    - board_reference: ["Q1"]
      part: "Transistor"
      generic_part: "transistor"
      quantity: 2
      data:
        model: "2SK170"
    - board_reference: ["Q2"]
      part: "Transistor"
      generic_part: "transistor"
      quantity: 2
      data:
        model: "2SJ74"
    - board_reference: ["Q3"]
      part: "Transistor"
      generic_part: "transistor"
      quantity: 2
      data:
        model: "IRFP9140"
    - board_reference: ["Q4"]
      part: "Transistor"
      generic_part: "transistor"
      quantity: 2
      data:
        model: "IRFP140"
    - board_reference: ["R1", "R7"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 4
      data:
        value: "1k"
        tolerance: "1"
    - board_reference: ["R2"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 2
      data:
        value: "200k"
        tolerance: "1"
    - board_reference: ["R3"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 2
      data:
        value: "221k"
        tolerance: "1"
    - board_reference: ["R4", "R0"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 4
      data:
        value: "22.1k"
        tolerance: "1"
    - board_reference: ["R5"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 2
      data:
        value: "475"
        tolerance: "1"
    - board_reference: ["R6", "R12", "R13"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 6
      data:
        value: "100"
        tolerance: "1"
    - board_reference: ["R8", "R9"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 4
      data:
        value: ".47"
        wattage: "3"
        tolerance: "1"
    - board_reference: ["R10"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 2
      data:
        value: ".33"
        wattage: "3"
        tolerance: "1"
    - board_reference: ["R11"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 2
      data:
        value: "1"
        wattage: "3"
        tolerance: "1"
    - board_reference: ["C1"]
      part: "Capacitor"
      generic_part: "capacitor"
      quantity: 2
      data:
        value: "1µ"
    - board_reference: ["C4", "C5"]
      part: "Capacitor"
      generic_part: "capacitor"
      quantity: 4
      data:
        value: "1000µ"
    - board_reference: ["C6"]
      part: "Capacitor"
      generic_part: "capacitor"
      quantity: 2
      data:
        value: "1"
    - board_reference: ["C2", "C3"]
      part: "Capacitor"
      generic_part: "capacitor"
      quantity: 4
      data:
        value: "15000µ"
    - board_reference: ["P1", "P2"]
      part: "Trim potentiometer"
      generic_part: "potentiometer"
      quantity: 4
      data:
        value: "2k"
    - board_reference: ["JP1"]
      part: "Jumper Header"
      generic_part: "header"
      quantity: 2
      data: {}
    - board_reference: ["-"]
      part: "Jumper Connector"
      generic_part: "jumper"
      quantity: 2
      data: {}
    - board_reference: ["-"]
      part: "LED"
      generic_part: "led"
      quantity: 2
      data:
        size: "5mm"
    - board_reference: ["-"]
      part: "Rocker Switch, SPDT"
      generic_part: "hardware"
      quantity: 1
    - board_reference: ["-"]
      part: "Toggle Switch, SPST"
      generic_part: "hardware"
      quantity: 1
    - board_reference: ["-"]
      part: "XLR Female"
      generic_part: "hardware"
      quantity: 1
    - board_reference: ["-"]
      part: "RCA Pair"
      generic_part: "hardware"
      quantity: 1
    - board_reference: ["-"]
      part: "Binding Post, red"
      generic_part: "hardware"
      quantity: 2
    - board_reference: ["-"]
      part: "Binding Post, black"
      generic_part: "hardware"
      quantity: 2
    - board_reference: ["-"]
      part: "DC Jack"
      generic_part: "hardware"
      quantity: 1
    - board_reference: ["-"]
      part: "DC Plug Adapter"
      generic_part: "hardware"
      quantity: 1
    - board_reference: ["-"]
      part: "Thermal Pad, alumina"
      generic_part: "hardware"
      quantity: 4
    - board_reference: ["-"]
      part: "Themal Paste Packet"
      generic_part: "hardware"
      quantity: 1
    - board_reference: ["-"]
      part: "M3 x 10 screw"
      generic_part: "hardware"
      quantity: 6
    - board_reference: ["-"]
      part: "M3 x 6 screw"
      generic_part: "hardware"
      quantity: 2
    - board_reference: ["-"]
      part: "Belville Washer"
      generic_part: "hardware"
      quantity: 4
    - board_reference: ["-"]
      part: "Fender Washer"
      generic_part: "hardware"
      quantity: 4
    - board_reference: ["-"]
      part: "M3 Keps nut"
      generic_part: "hardware"
      quantity: 2
    - board_reference: ["-"]
      part: "M3 Standoff"
      generic_part: "hardware"
      quantity: 2
    - board_reference: ["-"]
      part: "28 AWG Wire, red"
      generic_part: "wire by foot"
      quantity: 2
    - board_reference: ["-"]
      part: "28 AWG Wire, black"
      generic_part: "wire by foot"
      quantity: 2
    - board_reference: ["-"]
      part: "28 AWG Wire, blue"
      generic_part: "wire by foot"
      quantity: 1
    - board_reference: ["-"]
      part: "18 AWG Wire, red"
      generic_part: "wire by foot"
      quantity: 1
    - board_reference: ["-"]
      part: "18 AWG Wire, black"
      generic_part: "wire by foot"
      quantity: 1
    
    
    
---

# ACA MinMax Build Guide

## Checking Contents

Before the build check off each item on the bill of materials (BOM) to make sure that nothing is missing from the kit. If there are missing parts please [send me a message](https://reduxkits.com/pages/contact)!

{% include board_graphics.html bom=page.bom %}

## END_SECTION ##

## BOM

{% include bom.html bom=page.bom %}
## END_SECTION ##

{% include step.html title="General Build Strategy" %}

Populate the board starting with the smallest components first (resistors) and work up in size until eveything is installed. Several components can be loaded into the board at one time before soldering them to the PCB. When adding parts, their leads can be splayed outward to keep them from falling out when the board is flipped over for soldering. If you solder one leg of a component it can be adjusted slightly before soldering the other leg to lock it in place. 

There are hundreds (probably thousands) of soldering tutorials online, so I'll keep the advice here breif. The most common issue I see is not using a good quality solder and soldering iron. My general purpose solder is 0.8 mm (0.31") diameter, 63% tin 37% lead, rosin core from Kester. A 1 pound roll lasts several years. 
## END_SECTION ##

{% include step.html title="Labeling Resistors" %}

It can be helpful to write the resistor values on the paper tape they are atached to before assembly. The resistor color code can be used for this, but it's even easier to use a multimeter to measure the values directly. Resistors have some tolerance so you may need to "round" to the nearest value, for example, 9.97K → 10K. Typical handheld multimeters do not measure low resistances very accurately, so you may want to use the color codes for the larger 3 watt resistors. 

## END_SECTION ##

{% include step.html title="Add Resistors" bom_references="'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11'"%}

Add each small resistor to the board, solder them on the back side, and trim the leads.

The larger power resistors will run cooler if they are spaced a bit off the board for air flow. 

{% include graphics_for_step.html bom_references="'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11'" %}

## END_SECTION ##

{% include step.html title="Potentiometers" bom_references="'P1', 'P2'"%}

The potentiometers are next, solder them into the board. Now we can set their initial position to the right place in preparation for biasing later. Using the ohms setting on a multimeter, measure across the marked points and turn each pot with a small flat blade screwdriver until it reads 0 ohms (or near zero). 

{% include graphics_for_step.html bom_references="'P1', 'P2'" %}
## END_SECTION ##

{% include step.html title="Jumper" bom_references="'JP1'"%}

Solder in the jumper header. This jumper is used to change between two operating modes of the amplifier. With the jumper in, the 2nd harmonic distortion at the output is reduced (see discussion in the original [ACA Mini article (PDF)](https://www.firstwatt.com/wp-content/uploads/2023/12/art_aca_mini.pdf)). In short, jumper disconnected will have a “warmer” sound and jumper connected will be a “cleaner” sound. The jumper can be stored on the PCB in the disconnected state by sliding it over only one of the header pins. 

{% include graphics_for_step.html bom_references="'JP1'" %}
## END_SECTION ##
{% include step.html title="Test Points" %}

Test point loops are provided in the kit and can be soldered in. These will make it easier to connect the multimeter later when setting the bias and DC offset. If you only have plain pokey multimeter leads, mounting them with the loops horizontal will probably be best. If you have grabby test hooks (sometimes called witches hats) vertical loops will be better. 
## END_SECTION ##

{% include step.html title="Small Transistors" bom_references="'Q1', 'Q2'" %}

Add the Q1 2SK170 and Q2 2SJ74 JFETs onto the board. "K170" and "J74" are etched into the flat side of the case to identify which is which. These can be placed above the board such that you don't need to trim the leads after soldering, which helps protect them from the heat of soldering and any mechanical stresses they might encounter. 
{% include graphics_for_step.html bom_references="'Q1', 'Q2'" %}

## END_SECTION ##

{% include step.html title="Small Capacitors" bom_references="'C1', 'C4', 'C5', 'C6'" %}

Install and solder the capacitors making sure that they are the right way around. Each capacitor has a white stripe on the negative side, except for C1 which is non-polar and can be installed either direction. 

{% include graphics_for_step.html bom_references="'C1', 'C4', 'C5', 'C6'" %}

## END_SECTION ##

{% include step.html title="Large Capacitors" bom_references="'C2', 'C3'" %}

Install and solder the larger capacitors, again  making sure that they are the right way around. Each capacitor has a white stripe on the negative side. 

{% include graphics_for_step.html bom_references="'C2', 'C3'" %}

## END_SECTION ##

{% include step.html title="Heatsink Preparation" %}

Remove the heatsinks and silver brackets from their packaging. Screw the brackets onto the heatsinks using the silver philips screws. These brackets are not the same on both ends. The back panel screws go into the threaded holes and the front panel is bolted on through the non-threaded holes. Do not install the front and back panel yet, just note which side is which. 

If there is any residue or dust on the flat face of the heatsink, wipe it down so the transistors will have a clean surface to mount to. 

## END_SECTION ##

{% include step.html title="Large Transistor Preparation" bom_references="'Q3', 'Q4'" %}

Bend the legs of the large transistors up at a right angle by holding the body of the transistor and pushing up near the end each leg. It will bend in the correct location to fit the PCB if done this way. 


## END_SECTION ##

{% include step.html title="Standoffs and Test Fitting" %}

Add the brass standoff to the heatsink and tighten with pliers or a small wrench. This does not need to be super tight and you risk breaking off the brass stud inside the heatsink if tightened too much. 

To test fit the transistors, only the thermal pad and  the longer M3 screw are needed. Do not add thermal compound yet. Attach each the transistor and pad to the heatsink using the screw, but do not tighten  so the transistor is free to rotate. Q3 goes toward the back (threaded hole in bracket) and Q4 toward the front (plain holes) on both heatsinks. 

Align the holes on the PCB with the leads of the transistors and slide it down toward the heatsink. If it doesn't go easily, adjust the bend angle of the leads, do not force the PCB down. Once the PCB is all thew way down, confirm that the short M3 screw fits though the board and into the brass standoff. 

Once you have a sucessful test fit, undo everything we just did, but leave the standoff. 

## END_SECTION ##

{% include step.html title="Mounting Transistors" bom_references="'Q3', 'Q4'" %}

Using gloves or a small spreading tool apply the themal compound to both sides of each thermal pad in a thin even layer. The amount in the supplied packet will just cover all 8 sides. 

Place the gooped up pads onto the heatsinks, then the transistors. Slide the belleville washer and flat washer onto the screw and thread it loosely into the hole. The flat washer should be touching the transistors and the belleville washes should be just under the screw head. 

Sldie the PCB over the transistors like before and tighten the center mounting screw into the standoff. 

Now tighten the transistor screws. Enough to flatten the belleville washers, but not super tight. Over tightening can crack the silicon inside the transistors. 

After everything is mounted securely to the heatsink, solder the leads of the transistors to the PCB. 

{% include graphics_for_step.html bom_references="'Q3', 'Q4'" %}

## END_SECTION ##

{% include step.html title="Rear Panel Mod" %}

The chassis is designed for the original Amp Camp Amp and consequently, the rear panel markings are for that amplifier. The rear panel can be modified to suit the ACA MinMax by blacking out some areas with permanent marker and applying a few stickers to change the indicated polarity. If you don't need or want any markings, the panel can be flipped around to show the plain black side, but you'll need to drill new holes for the XLR connector mounting screws. 

## END_SECTION ##

{% include step.html title="Connectors, Switches, and LEDs" %}

Screw each connector into the back panel tighten, using the isolation washers for the RCA jacks and binding posts. When installing the rear switch, rotate it so the terminals are toward the top of the chassis. This rear switch is used to connect the inpus together for parallel mono operation. 

The LEDs can be mounted into the holes on the front panel with heatshink or glue. If this is your preferred method, add enough wire to them to reach the PCB before mounting to the panel. 

I prefer to fill the hole with a diffusing material, point the LEDs toward that and solder them directly to the PCBs without wires. Hot glue works great for this. Place the panel face down on a flat surface and use a hot glue gun to fill the hole. 

The front switch takes some force to press into the panel. It does not matter which side is up, but align the terminals vertically so the switch action is up and down. 

## END_SECTION ##

{% include step.html title="Partial Chassis Assembly" %}

Check which side is up and attach the heatsink bracket to the front panel using the remainng silver philips screws. The angle is a bit awkward but a long screw driver can make it easier. 

Attach the rear panel to the bracket using the black phillips screws. 

## END_SECTION ##

{% include step.html title="Wiring" %}

Make each wire connection between the PCBs, connectors, and switches as shown. The input wire pairs and front switch wires can be twisted for a neater appearance, but it is a bit more difficult and is not strictly necessary. 

## END_SECTION ##

{% include step.html title="First Power On" %}

Connect a voltmeter to the GND and Vb test points on one if the boards. If you have a second voltmeter do the same with the other board. If you don't, you'll need to move one multimeter lead between the Vb test point on both boards for each step. The ground connection can stay where it is. 

Turn off the front panel switch (down) and set the rear switch to stereo (up). Conect the power adapter to the barrel jack and plug the other end into the wall. Both Vb test points should be 0V. If either is not or if you see, hear, or smell anything funny, unhook everything and go to troubleshooting. 

If nothing happens after 10 seconds... great! 

Turn the front panel switch on and again watch for nothing to happen, we still want 0V on both test points. 

## END_SECTION ##

{% include step.html title="Setting Bias and DC Offset" %}

Time to make something happen. We'll set bias one board at a time. Connect the meters to Vb on the milivolt range and Vo on the volt range. If you have one meter just connect to Vb for now. 

Vb to ground is across resistor R9. To convert any voltage measurements here to bias current, divide the voltage by the resistance, 0.47 ohms. 

Turn P1 half a turn, then P2 half a turn and keep alternating half a turn at a time until you see the measurements start to change. Vb will slowly rise, Vo at first is a bit unpredictactable, but from here try to keep within a few volts of 17.5 V.  Now that something is happening, we can watch to see what turing each pot does. Turning either clockwise increases the bias and Vb. Turning one more than the other will move the DC offset, Vo, up or down. Now alternate between each pot more slowly and rely on the measuerments instead of counting turns. Behind the scenes, temperature is also affecting the bias and offset which is why you may notice that the measurements change even when pots aren't being turned. The bias will increase as the amp warms up, so set Vb to about 300mV with Vo between 17-18V and wait for the measurements to stabilize so we don't overshoot the target. The goal at this stage is Vb between 350 and 370 mV. 

Follow the same process for the second board. Now that we're close to the final setting, the amp needs to be closed up so the temperatures inside match regualr operation. Disconnect the meters and attach the bottom panel to the chassis with the M3 screws. Set the top panel in place, it doesn't need to be screwed down yet. After 30 minutes remove the top and check all the test points. The final target is Vb between 380 - 400 mV (800 - 850mA) and Vo = 17.5V ± 0.5V . The exact bias current is not as important as stable bias.

**Ultimately it is up to each builder to select an appropriate bias current for their build that takes into consideration the local climate, airflow around the heatsinks, and personal tolerance for hot metal objects in the home.**

Best practice is to not exceed 60°C (140°F) external temperature. You should be able to place a hand on the heatsinks for several seconds without pain. The MinMax does not have temperature compensation and bias can increase as temperature increases. It is a good idea to periodically check the bias current and readjust as needed, especially when the weather is warm.

{% include board_graphics.html bom=page.bom %}

## END_SECTION ##

{% include step.html title="Operating Modes" %}

The ACA MinMax can be run in stereo, balanced mono, or parallel mono modes. 
