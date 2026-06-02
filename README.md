# Ebola-Outbreak-Interactive-Web-Tools

Executive Summary 

Deliver a fully **client-side, single-file** epidemiological surveillance dashboard covering the 2014–2016 West Africa Ebola outbreak. The dashboard must open directly in any modern browser with no installation, no server, no API keys, and no build step — yet present data at the standard of a professional WHO/CDC platforms.

The subject: the 2014–2016 West Africa Ebola outbreak.

The largest in recorded history. 28,616 cases across 10 countries over 25 months.  The dataset was obtained from kaggle.com (https://www.kaggle.com/datasets/parulkhare26/ebola-data)

What I built:
1.	An animated geographic replay of the epidemic, frame by frame, across six cities on a hand-drawn SVG map
2.	A counterfactual simulator that reshapes the epidemic curve in real time as you adjust intervention timing and effectiveness
3.	A district-level risk profiler with filter, sort, and click-to-expand detail panels
4.	A CFR calculator with Wilson Score confidence intervals benchmarked against eight historical outbreaks
5.	A healthcare worker burden explorer showing how HCW infections preceded the general population peak by three weeks
6.	A full surveillance dashboard with animated KPI counters and epidemic curve toggle

Every tool is a single HTML file. All data is embedded as JS constants. No build step. No dependencies.
I also wrote a documentation guideline manual covering everything from heading hierarchy and banned words to ADR templates, changelog format, and CI linting pipelines — because good tooling deserves good docs.
