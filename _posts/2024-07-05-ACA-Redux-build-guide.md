---
layout: post
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
  graphics: ["ACA-Redux-Assembly-Graphic.svg"]
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
        value: "1000"
        units: "µ"
    - board_reference: ["C3", "C4"]
      part: "Capacitor"
      generic_part: "capacitor"
      quantity: 4
      data:
        value: "10"
        units: "µ"
    - board_reference: ["P1"]
      part: "Trim potentiometer"
      generic_part: "potentiometer"
      quantity: 2
      data:
        value: "5"
        units: "k"
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
        units: ""
        wattage: "3"
        tolerance: "1"
    - board_reference: ["R3", "R4"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 4
      data:
        value: "0.68"
        units: ""
        wattage: "3"
        tolerance: "1"
    - board_reference: ["R5", "R6"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 4
      data:
        value: "100"
        units: ""
        tolerance: "1"
    - board_reference: ["R8", "R9", "R14"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 6
      data:
        value: "1"
        units: "k"
        tolerance: "1"
    - board_reference: ["R7", "R11", "R13", "R16"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 8
      data:
        value: "10"
        units: "k"
        tolerance: "1"
    - board_reference: ["R10"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 2
      data:
        value: "332"
        units: "k"
        tolerance: "5"
    - board_reference: ["R12"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 2
      data:
        value: "39.2"
        units: "k"
        tolerance: "5"
    - board_reference: ["R15"]
      part: "Resistor"
      generic_part: "resistor"
      quantity: 2
      data:
        value: "2.2"
        units: "k"
        tolerance: "5"
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
    - board_reference: ["-"]
      part: "Standoff, M3 × 6mm, brass"
      generic_part: "hardware"
      quantity: 8
      data: {}
    - board_reference: ["-"]
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



<!-- Introduction text -->

This is the build guide for the ACA Redux. Please read through this guide once or twice before building your amplifier Before the build check off each item on the bill of materials (BOM) to make sure that nothing is missing from the kit. If there are missing parts please [send me a message](https://reduxkits.com/pages/contact)!

<!-- To draw all SVG graphics: -->

{% include board_graphics.html bom=page.bom %}

## BOM

<!-- BOM Table -->

{% include bom.html bom=page.bom %}

<!-- A step heading, with the associated BOM components that should be shown -->
<!-- You do not need to number steps, it will be automatic -->
{% include step.html title="Small Resistors" bom_references="'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11', 'R12', 'R13', 'R14', 'R15', 'R16'" %}

You can solder the resistors one by one, or do them all at once.
Note R16 is not grouped with the other resistors.

<!-- Step graphics are populated from the BOM -->
{% include graphics_for_step.html bom_references="'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11', 'R12', 'R13', 'R14', 'R15', 'R16'" %}


<!-- Large Resistor Step -->
{% include step.html title="Large Resistors" bom_references="'R1', 'R2', 'R3', 'R4'"%}
Solder the large resistors.

{% include graphics_for_step.html bom_references="'R1', 'R2', 'R3', 'R4'" %}

The large resistors get warm during operation. Some space off the PCB will help airflow. You can use the brass standoff to gauge the space under the large resistors. It helps to solder one leg from this side before flipping the PCB over.

![Large Resistors & Brass Standoff]({{ site.url }}/images/aca-redux-large-resistors-brass-standoff.jpeg)

<!-- Pots and 10uF Caps -->
{% include step.html title="Potentionmeter & Small Caps" bom_references="'P1', 'C3', 'C4'" %}

P1 is keyed and cannot be inserted backwards. Solder the C3 and C4 capacitors with the long leg in the + hole.

{% include graphics_for_step.html bom_references="'P1', 'C3', 'C4'" %}

<!-- 
## Step 26: Small Signal Transistors

As shown in photo 1, the ZTX450 is just a bit bigger than the 2SK370.  
Note that the outline on the PCB is drawn in a way to look like the shape of the transistors, both of these are directional.  
The slightly longer/bigger face of the transistor is called the flat, align it with the slightly longer side of the outline drawn on the PCB.

## Step 27: Soldering Small Transistors

Slightly bend the leads and solder.  
The transistors have 3 solder pads each, the capacitors have 2.  
It is very important that the solder doesn't connect to other pads on the bottom... this is called a solder bridge and is bad.  
The pads between the capacitor legs are a bit tight, be careful.

## Step 28: 1000uF Capacitors

The leads of the 1000uF capacitors need to be bent down before installation.  
Use one of the long screws as a bending guide.  
Hold the capacitor as shown, with the negative marking towards you, and bend leads down 90deg.  
The caps should look like Photo 2 before installation.  
Double-check your polarity, install and solder.

## Step 29: Power Switch

Make sure the switch is flat and square on the PCB before soldering.  
The round cap (not shown) is press fit on the switch.

## Step 30: DC Power Jack

Make sure the DC power jack is flat and square on the PCB before soldering.  
Photo 2 - As you can see, the solder tabs are a little short. It will still solder nicely with a bit of care.

## Step 31: RCA Jack

Like all the rest of the PCB mount jacks, ensure the RCA jack is flat and square to the PCB before soldering.  
It may take a bit of effort to push it flat. That's ok, as flat and square to the PCB is the goal.

## Step 32: Speaker Posts

Solder the binding posts to the screw terminals before adding them to the PCB. This takes patience! Use a larger solder tip if you have one.  
Align the holes in the binding post to be vertical when installed.  
Some binding posts run out of threads when they're screwed all the way in. Adding the included split washer between the parts will help the threads stay engaged and hold alignment while soldering.  
This will be easier if you remove the nut portion of the assembly, there will be less thermal mass to heat for effective soldering.

## Step 33: One PCB Side Complete!

At this point the PCB should look like this.  
Photos for reference.

## Step 34: The Other Side

Getting close to completely stuffing the PCB.  
There are a couple things to stuff on the other side, these will point 'up' during normal operation.  
Please find the pads for the LEDs.

## Step 35: LEDs

Insert the long leg of the LED into the + hole.  
Flip the PCB and solder as normal.  
Photo 3 for reference.  
If you don’t like the color-changing LEDs, you may substitute solid color LEDs of your choice or leave them out entirely.

## Step 36: Brass Standoffs

Screw the 4 brass standoffs into the outermost holes along the heatsink.

## Step 37: Bending the Transistor Legs

The transistor legs need to be bent up 90deg towards the plastic side of the body right at the point they narrow.  
Bending can be done with pliers, but the leads naturally bend at the correct point even when done by hand.

## Step 38: Insulating and Securing Transistors

Photo 1 - Insulator pads install here. Make sure they are clean and free of any metal crumbs or little solder blobs.  
Photo 2 - Attach the transistors to the heatsink with the screw and washer.  
Do NOT tighten the screws beyond what will hold them in place loosely. They still need to move a little at this point.  
Make sure the insulator pad is square with the transistor and 100% of the transistor is resting on the pad.  
The heatsink and PCB assembly go together so the flat bits are aligned. It does not matter which of the large transistors is used as Q1 or Q2; they are identical and symmetrical at this point.

## Step 39: Alignment of Transistors to PCB

Before the PCB goes on, make sure:

-   The (4) brass standoffs are inserted and secure
-   The big transistors have the blue insulators aligned nice and square under them and none of the transistor body is touching the metal itself
-   That the screw and washer holding the transistors are attached but not tight yet
-   Make sure the 3 pins per transistor are in their holes

## Step 40: Attaching PCB to Heatsink

Make sure all the transistor legs are in the holes, then:

-   Gently wiggle the PCB and get the mounting holes over the brass standoffs
-   Insert and attach the (4) black 'legs' into the brass standoffs and get everything squared up and snug  
    Photo 2 - Look under the PCB and make sure there are no uncut leads. The only things visible from the bottom should be the power transistors, the brass standoffs, and the LEDs.

## Step 41: Attaching PCB to Heatsink, continued

With the PCB attached with all four legs attached,  
NOW you tighten the power transistor screws - firm, but not super tight. You want them to be attached fairly firmly, but don't break or bend anything.  
And FINALLY, after the PCB is lined up, attached, and the transistors are tightened, you solder both power transistors to the PCB.

## Step 42:

It looks like a mechanical hedgehog.  
DC balance set to 12V.

## Step 43: VIDEO - Setting DC Balance

A short video to show setting DC balance.  
Be patient. Go slow. Enjoy the process.

## Step 44: Connections to Input, Power, Speakers

PSU attaches to the black barrel jack.  
Input to the RCA jack.  
Speaker wires attach to the binding posts.

## Step 45: Sign Your Work

Make sure you sign your name to your new amplifiers when you complete them in the provided label space.

## Step 46: If You Need a PCB Holder

This works nicely. Be very gentle with it in this configuration; it's delicate and easy broken. But it sure is handy at times. -->
