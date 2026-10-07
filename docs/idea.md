# SmartFan OS - Project Idea

## Problem

Traditional fans require users to manually select the fan speed.
They continue operating at the selected speed even when environmental
conditions change or when nobody is present.

## Proposed Solution

SmartFan OS uses temperature, humidity and occupancy information
to intelligently determine an appropriate fan speed.

## Main Inputs

- Temperature
- Humidity
- Human presence
- Time

## Main Output

- Fan ON/OFF status
- Fan speed
- Energy consumption
- Smart recommendations

## Initial Control Logic

- No person detected → Fan OFF
- Temperature below 27°C → Low speed
- Temperature 27–30°C → Medium speed
- Temperature above 30°C → High speed
- High humidity → Increase speed when appropriate