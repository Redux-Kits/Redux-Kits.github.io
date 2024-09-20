---
layout: tutorial
title: "ACA Redux"
categories: 
  - build guide
author:
  - 6L6
tags: 
  - amplifier
difficulty:
  - easy
bom:
  graphics: ["ACA-Redux-Assembly-Graphic.svg" , "ACA-Redux-board-backside.svg"] #
  components:
    - board_reference: ["-"]
      part: "Circuit boards"
      generic_part: "board"
      quantity: 2
      data: {}
    - board_reference: ["-"]
      part: "Heatsinks"
      generic_part: "heatsink"
      quantity: 2
      data: {}
    - board_reference: ["Q1", "Q2"]
      part: "MOSFET"
      generic_part: "transistor"
      quantity: 4
      data:
        model: "IRFP048"
    - board_reference: ["Q3"]
      part: "BJT"
      generic_part: "transistor"
      quantity: 2
      data:
        model: "ZTX450"
    - board_reference: ["Q4"]
      part: "JFET"
      generic_part: "transistor"
      quantity: 2
      data:
        model: "2SK370"
    - board_reference: ["J1"]
      part: "DC power jack"
      generic_part: "terminal"
      quantity: 2
      data: {}
    - board_reference: ["J2"]
      part: "RCA jack"
      generic_part: "terminal"
      quantity: 2
      data: {}
    - board_reference: ["SW1"]
      part: "Power switch"
      generic_part: "switch"
      quantity: 2
      data: {}
    - board_reference: ["C1", "C2"]
      part: "Capacitor"
      generic_part: "capacitor"
      quantity: 8
      data:
        value: "1000µ"
    - board_reference: ["C3", "C4"]
      part: "Capacitor"
      generic_part: "capacitor"
      quantity: 4
      data:
        value: "10µ"
    - board_reference: ["P1"]
      part: "Trim potentiometer"
      generic_part: "potentiometer"
      quantity: 2
      data:
        value: "5k"
    - board_reference: ["D1", "D2"]
      part: "LED"
      generic_part: "led"
      quantity: 4
      data:
        size: "5mm"
        color: "cyan"
    - board_reference: ["R1", "R2"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 4
      data:
        value: "0.47"
        wattage: "3"
        tolerance: "1"
    - board_reference: ["R3", "R4"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 4
      data:
        value: "0.68"
        wattage: "3"
        tolerance: "1"
    - board_reference: ["R5", "R6"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 4
      data:
        value: "100"
        tolerance: "1"
    - board_reference: ["R8", "R9", "R14"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 6
      data:
        value: "1k"
        tolerance: "1"
    - board_reference: ["R7", "R11", "R13", "R16"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 8
      data:
        value: "10k"
        tolerance: "1"
    - board_reference: ["R10"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 2
      data:
        value: "332k"
        tolerance: "1"
    - board_reference: ["R12"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 2
      data:
        value: "39.2k"
        tolerance: "1"
    - board_reference: ["R15"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 2
      data:
        value: "2.2k"
        tolerance: "1"
    - board_reference: ["J3", "J4"]
      part: "Screw terminal"
      generic_part: "terminal"
      quantity: 4
      data: {}
    - board_reference: ["-"]
      part: "Binding post, red"
      generic_part: "terminal"
      quantity: 2
      data: {}
    - board_reference: ["-"]
      part: "Binding post, black"
      generic_part: "terminal"
      quantity: 2
      data: {}
    - board_reference: ["BSO1", "BSO2", "BSO3", "BSO4"]
      part: "Standoff, M3 × 6mm, brass"
      generic_part: "hardware"
      quantity: 8
      data: {}
    - board_reference: ["NSO1", "NSO2", "NSO3", "NSO4"]
      part: "Standoff, M3 × 15mm, nylon"
      generic_part: "hardware"
      quantity: 8
      data: {}
    - board_reference: ["-"]
      part: "M3 × 10mm screw"
      generic_part: "hardware"
      quantity: 4
      data: {}
    - board_reference: ["-"]
      part: "M3 fender washer"
      generic_part: "hardware"
      quantity: 4
      data: {}
    - board_reference: ["-"]
      part: "Belleville washer"
      generic_part: "hardware"
      quantity: 4
      data: {}
    - board_reference: ["-"]
      part: "Thermal pad TO-247, alumina"
      generic_part: "hardware"
      quantity: 4
      data: {}
    - board_reference: ["-"]
      part: "Thermal grease"
      generic_part: "hardware"
      quantity: 1
      data: {}
    - board_reference: ["-"]
      part: "Power supply, 24VDC, 2.5A"
      generic_part: "power"
      quantity: 2
      data: {}
    - board_reference: ["-"]
      part: "AC power cord"
      generic_part: "power"
      quantity: 2
      data: {}
---

<!-- Reference: https://guides.diyaudio.com/Guide/ACA+Redux/22 -->

<!-- Introduction text -->

This is the build guide for the ACA Redux. Please read through this guide once or twice before building your amplifier Before the build check off each item on the bill of materials (BOM) to make sure that nothing is missing from the kit. If there are missing parts please [send me a message](https://reduxkits.com/pages/contact)!

<!-- To draw all SVG graphics: -->


{% include board_graphics.html bom=page.bom %}

<!-- Section marker, used for generating PDFs, galleries, etc -->
## END_SECTION ##

## BOM

<!-- BOM Table -->

{% include bom.html bom=page.bom %}

## END_SECTION ##

<!-- A step heading, with the associated BOM components that should be shown -->
<!-- You do not need to number steps, it will be automatic -->
{% include step.html title="Small Resistors" bom_references="'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11', 'R12', 'R13', 'R14', 'R15', 'R16'" %}

You can solder the resistors one by one, or do them all at once.
Note R16 is not grouped with the other resistors.

<!-- Step graphics are populated from the BOM -->
{% include graphics_for_step.html bom_references="'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11', 'R12', 'R13', 'R14', 'R15', 'R16'" %}

## END_SECTION ##

<!-- Large Resistor Step -->
{% include step.html title="Large Resistors" bom_references="'R1', 'R2', 'R3', 'R4'"%}
Solder the large resistors.

{% include graphics_for_step.html bom_references="'R1', 'R2', 'R3', 'R4'" %}

The large resistors get warm during operation. Some space off the PCB will help airflow. You can use the brass standoff to gauge the space under the large resistors. It helps to solder one leg from this side before flipping the PCB over.

![Large Resistors & Brass Standoff]({{ site.url }}/images/aca-redux-large-resistors-brass-standoff.jpeg)

## END_SECTION ##

<!-- Pots and 10uF Caps -->
{% include step.html title="Potentionmeter & Small Capacitors" bom_references="'P1', 'C3', 'C4'" %}

P1 is keyed and cannot be inserted backwards. Solder the C3 and C4 capacitors with the long leg in the + hole.

{% include graphics_for_step.html bom_references="'P1', 'C3', 'C4'" %}

## END_SECTION ##

<!-- Small Signal Transistors -->
{% include step.html title="Small Signal Transistors" bom_references="'Q3', 'Q4'" %}

Q3 is slightly bigger than Q4. Both Q3 and Q4 are directional. The outline of each transistor is drawn on the PCB - the slightly longer/bigger face of the transistor is called the 'flat' and you should align it with the longer side of the outline on the PCB.

{% include graphics_for_step.html bom_references="'Q3', 'Q4'" %}

## END_SECTION ##

<!-- 1000uf Capacitors -->
{% include step.html title="Large Capacitors" bom_references="'C1', 'C2'" %}

The leads of C1 & C2 need to be bent down prior to installation. Use a long screw as a bending guide to ensure the bend does not occur too close to the packaging. Before making the bend, note of the direction of the capacitor. The long leg should go in the + hole and the capacitors should lie on the PCB outlines.

{% include graphics_for_step.html bom_references="'C1', 'C2'" %}

## END_SECTION ##

<!-- Power Switch -->
{% include step.html title="Power Switch" bom_references="'SW1'" %}

Make sure the switch is flat against the PCB before soldering. A round cap is provided to attach to the button.

{% include graphics_for_step.html bom_references="'SW1'" %}

## END_SECTION ##

<!-- DC Jack -->
{% include step.html title="DC Power" bom_references="'J1'" %}

Make sure the DC Power Jack is flat against the PCB before soldering. 

{% include graphics_for_step.html bom_references="'J1'" %}

## END_SECTION ##

<!-- RCA Jack -->
{% include step.html title="RCA Jack" bom_references="'J2'" %}

Again, make sure the RCA Jack is flat against the PCB before soldering. It may take some effort to push the RCA Jack into the PCB.

{% include graphics_for_step.html bom_references="'J2'" %}

## END_SECTION ##

<!-- Speaker Posts -->
{% include step.html title="Speaker Posts" bom_references="'J3', 'J4'" %}

Solder the binding posts to the screw terminal before adding them to the PCB. This takes patience and heat - use a larger soldering tip if possible. Align the holes in the binding post to be vertical when installed. Some binding posts run out of threads when they're screwed all the way in. Adding the included split washer between the parts will help the threads stay engaged and hold alignment while soldering. This will be easier if you remove the nut portion of the assembly, there will be less thermal mass to heat for effective soldering.

{% include graphics_for_step.html bom_references="'J3', 'J4'" %}

## END_SECTION ##

{% include step.html title="LEDs"  bom_references="'D1', 'D2'"%}

One side of the PCB is complete! Flip the PCB and insert the LEDs D1 & D2. Make sure the long leg goes in the + hole. If you dont like the color changing LEDS, you can subsitute for solid color LEDs of your choice, or leave them out entirely.

{% include graphics_for_step.html bom_references="'D1', 'D2" %}

## END_SECTION ##

{% include step.html title="Stand Offs" bom_references="'BSO1', 'BSO2', 'BSO3', 'BSO4'" %}
Screw the 4 brass standoffs into the outermost holes along the heatsink.
{% include graphics_for_step.html bom_references="'BSO1', 'BSO2', 'BSO3', 'BSO4'" %}

## END_SECTION ##
{% include step.html title="Transistor Preparation" bom_references="'Q1', 'Q2'" %}
The Q1 & Q2 transistor legs need to be bent up by 90 degrees towards the plastic side of the body, right at the point they narrow. Bending can be done with pliers but the leads will naturally bend at the correct point even when done by hand.

![Transistor with bent leads]({{ site.url }}/images/aca-redux-transistor-bent-lead.jpeg)

## END_SECTION ##
{% include step.html title="Insulating & Securing Transistors" bom_references="'Q1', 'Q2'" %}
Install the insulator pads to the head sink. Make sure they are clean and free of any metal crumbs or solder blobs.

![Insulator Pads on Heatsink]({{ site.url }}/images/aca-redux-insulator-pads-heatsink.jpeg)

Attach the Q1 & Q2 transistors to the heatsink with the screw and washer. It does not matter which side is Q1 or Q2. Do not tighten the screws yet - you will have to adjust the location of the transistors and screws in the next step. 
![Transistor Install View]({{ site.url }}/images/aca-redux-transistor-install.svg)

![Insulator Pads on Heatsink]({{ site.url }}/images/aca-redux-transistors-heatsink.jpeg)

## END_SECTION ##
{% include step.html title="Aligning Transistors & Attaching PCB To Heatsink" bom_references="'Q1', 'Q2', 'NSO1', 'NSO2', 'NSO3', 'NSO4'" %}
Before ading the PCB to the heatsink, make sure:

  - the brass standoffs are inserted and secure
  - the large Q1 & Q2 transistors have the insulators aligned nice and square under them
  - the large Q1 & Q2 transistors are not touhcing the metal of the heatsink
  - the screw and washer holding the large Q1 & Q2 transistors are attached but not tightened

The PCB and the heat sink go together so the flat parts are aligned. Align the 3 legs on Q1 & Q2 with their holes in the PCB.

![Insulator Pads on Heatsink]({{ site.url }}/images/aca-redux-transistor-alignment.jpeg)

{% include graphics_for_step.html bom_references="'Q1', 'Q2'" %}


<!-- 
0. finish fixing print
1. Hide board in hover overs in some scenarios (e.g Q1, Q2)
2. Fix the value / units weirdness in resistors and caps DONE
3. orientation flags (rotate deg) as optionals for showing images
4. Allow to show alt images in blog with a tag / layer name


when NEW parts are only on one side, only draw that PCB - that is currently the breaking thing. Can figure that out fo sho DONE
BACKLOG:
- Shopify
 -->