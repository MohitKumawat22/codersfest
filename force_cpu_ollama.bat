@echo off
set OLLAMA_NUM_GPU=0
set CUDA_VISIBLE_DEVICES=
echo Starting Ollama in FORCE CPU MODE...
ollama serve
